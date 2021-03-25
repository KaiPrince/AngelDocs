"""
* Project Name: AngelDocs
* File Name: main.py
* Programmer: Kai Prince
* Date: Sun, Mar 21, 2021
* Description: This file contains the main function.
"""
import shutil
import argparse
from pathlib import Path
import json
from typing import Dict, List, Union
import pycco
from collections import defaultdict
import itertools

import config


# Warning: The source path will be appended to the output directory.
#   It is best to run the program from the expected base directory.
#   e.g.:
#   * "." at project/src produces output/file1.md (good)
#   * "src" at project produces output/src/file1.md (good)
#   * BUT "../src" at project/other produces output/../src/file1.md (bad)


def main():
    """ This is the entrypoint for the application. """

    parser = argparse.ArgumentParser(
        description="Generate beautiful and comprehensive documentation from source."
    )
    parser.add_argument(
        "-p",
        "--project",
        type=str,
        dest="output_dir",
        default="docs",
        help="The name of the project page for these files.",
    )
    parser.add_argument("files", nargs="*", type=str, help="files to process")
    args = parser.parse_args()
    raw_sources = args.files

    # Get job paths.
    project_name = str(args.output_dir).strip("\"'")
    project_dir = Path(config.documents_path) / project_name
    site_config_file = Path(config.documents_path) / "siteConfig.json"
    outdir = config.build_path

    # clean_output_folders(project_dir, site_config_file, outdir)

    build_docs(raw_sources, outdir)

    # Write config file for static site generator.
    site_config = make_site_config(project_name, outdir, outdir.rglob("*.*"))
    site_config_file.write_text(json.dumps(site_config))

    # Create index file
    (outdir / "index.md").write_text(f"# {project_name.capitalize()}")

    # Move files to static site
    shutil.copytree(outdir, project_dir, dirs_exist_ok=True)

    print("Done.")


def build_docs(raw_sources: List[str], raw_outdir: str):
    files = resolve_file_sources(raw_sources)
    outdir = Path(raw_outdir).resolve()
    # Run pycco on files
    pycco.process(files, outdir=str(outdir), skip=True, md=True)
    # Post-process files
    for file in outdir.rglob("*.md"):
        content = file.read_text()
        if "<tab>" in content:
            safe_content = content.replace("<tab>", "tab")
            file.write_text(safe_content)


def resolve_file_sources(raw_sources: List[str]) -> List[str]:
    """Consumes a list of file path strings or glob strings and produces a list
    of file path strings."""

    files = []
    for raw_source in raw_sources:
        if Path(raw_source).is_absolute():
            raw_source = str(Path(raw_source).relative_to(Path.cwd()))
        for file_or_dir in Path.cwd().glob(raw_source):
            if file_or_dir.is_dir():
                files.extend(
                    [
                        str(file.relative_to(Path.cwd()))
                        for file in file_or_dir.rglob("*.*")
                    ]
                )
            else:
                files.append(str(file_or_dir.relative_to(Path.cwd())))
    return files


def make_site_config(project_name: str, outdir: Path, output_files: List[Path]):
    LinkItem = Dict[str, str]
    LinkGroup = Dict[str, Union[str, LinkItem]]
    LinkTree = List[LinkGroup]

    FILE_MARKER = "<files>"

    def attach(branch, trunk):
        """
        Insert a branch of directories on its trunk.
        """
        parts = branch.split("/", 1)
        if len(parts) == 1:  # branch is a file
            trunk[FILE_MARKER].append(parts[0])
        else:
            node, others = parts
            if node not in trunk:
                trunk[node] = defaultdict(dict, ((FILE_MARKER, []),))
            attach(others, trunk[node])

    # Construct file tree
    files: LinkTree = []
    main_dict = defaultdict(dict, ((FILE_MARKER, []),))
    for file in output_files:
        file_path = Path(file)

        link = (
            Path(project_name) / file_path.relative_to(outdir).with_suffix("")
        ).as_posix()

        attach(link, main_dict)

    # Convert file tree to config tree
    def make_config_tree(node, path=""):
        if isinstance(node, list):
            leaf = [
                {
                    "text": file,
                    "link": f"{path.removesuffix(FILE_MARKER)}{file}",
                }
                for file in node
            ]
            return leaf
        elif isinstance(node, dict):
            children = []
            for key, value in node.items():
                child_node_node = make_config_tree(value, f"{path}/{key}")
                if isinstance(child_node_node, list):
                    children.extend(child_node_node)
                else:
                    children.append(child_node_node)
            child_node = {
                "text": Path(path).stem,
                "children": children,
            }
            return child_node
        else:
            raise ValueError("Corrupt file tree", node)

    config_tree = make_config_tree(main_dict["project"], "/project")

    site_config = {
        "projects": [
            {
                "text": f"{project_name.capitalize()}",
                "link": f"/{project_name}/",
                "children": config_tree["children"],
            }
        ]
    }
    return site_config


def clean_output_folders(project_dir, site_config_file, outdir):
    """ Remove all files present in our output folders. """

    if outdir.exists():
        shutil.rmtree(outdir)
    if project_dir.exists():
        shutil.rmtree(project_dir)
    if site_config_file.exists():
        site_config_file.unlink()


if __name__ == "__main__":
    main()
