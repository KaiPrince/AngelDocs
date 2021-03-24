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
from typing import List
import pycco

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
    # TODO remove this comment by renaming the variable
    # ..sources are file paths that may include globs and may be relative.
    raw_sources = args.files

    # Get job paths.
    project_name = str(args.output_dir).strip("\"'")
    project_dir = Path(config.site_dir) / project_name
    site_config_file = Path(config.site_dir) / "siteConfig.json"
    outdir = config.outdir

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
    # LinkItem = Dict[str, str]
    # LinkGroup = Dict[str, Union[str, LinkItem, "LinkGroup"]]
    # LinkTree = List[LinkGroup]

    files = []
    for file in output_files:
        file_path = Path(file)

        text = Path(file).stem
        link = (
            Path(project_name) / file_path.relative_to(outdir).with_suffix("")
        ).as_posix()

        tree = {
            "text": text,
            "link": f"/{link}",
        }

        files.append(tree)

    site_config = {
        "projects": [
            {
                "text": f"{project_name.capitalize()}",
                "link": f"/{project_name}/",
                "children": files,
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
