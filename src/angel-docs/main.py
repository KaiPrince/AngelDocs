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
from typing import List
import pycco
import glob

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
    outdir = config.build_path

    clean_output_folder(outdir)

    build_docs(raw_sources, outdir)

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
        for file_or_dir in glob.glob(raw_source):
            if not Path(file_or_dir).exists():
                print(f"{file_or_dir} doesn't exist. Skipping.")
                continue
            file_or_dir = Path(file_or_dir).resolve()
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


def clean_output_folder(outdir):
    """ Remove all files present in our output folders. """

    if outdir.exists():
        shutil.rmtree(outdir)


if __name__ == "__main__":
    main()
