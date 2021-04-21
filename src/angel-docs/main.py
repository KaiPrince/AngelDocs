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
from utils import make_ignore_matcher
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
    parser.add_argument(
        "-i",
        "--ignore-path",
        type=str,
        dest="ignore_paths",
        default=[],
        action="append",
        help="Glob pattern to ignore (e.g. project/modules/**)",
    )
    parser.add_argument("files", nargs="*", type=str, help="Files to process")
    args = parser.parse_args()
    raw_sources = args.files
    ignore_paths = args.ignore_paths

    # Get job paths.
    project_name = str(args.output_dir).strip("\"'")
    project_dir = Path(config.documents_path) / project_name
    outdir = config.build_path

    clean_output_folder(outdir)

    files = resolve_file_sources(raw_sources, ignore_paths=ignore_paths)
    build_docs(files, outdir)

    # Create index file
    if not outdir.exists():
        raise ValueError("Output folder was not created. Something went wrong.")
    (outdir / "index.md").write_text(f"# {project_name.capitalize()}")

    # Move files to static site
    shutil.copytree(outdir, project_dir, dirs_exist_ok=True)

    print("Done.")


def build_docs(files: List[str], raw_outdir: str):
    outdir = Path(raw_outdir).resolve()
    # Run pycco on files
    pycco.process(files, outdir=str(outdir), skip=True, md=True)
    # Post-process files
    for file in outdir.rglob("*.md"):
        content = file.read_text()
        if "<tab>" in content:
            safe_content = content.replace("<tab>", "tab")
            file.write_text(safe_content)

    # Remove empty files
    def is_empty(text: str):
        result = True

        for line in text.splitlines():
            if not line.startswith("```") and not line == "":
                result = False
                break

        return result

    for file in outdir.rglob("*"):
        if file.is_file() and is_empty(file.read_text()):
            file.unlink()

    # Copy readmes
    for file in files:
        if file.endswith(".md"):
            output_file = outdir.joinpath(file)
            shutil.copy(file, str(output_file))


def resolve_file_sources(
    raw_sources: List[str], ignore_paths: List[str] = None
) -> List[str]:
    """Consumes a list of file path strings or glob strings and produces a list
    of file path strings."""

    if ignore_paths is None:
        ignore_paths = []

    files = []
    for raw_source in raw_sources:
        # Replace absolute paths with relative.
        if Path(raw_source).is_absolute():
            raw_source = str(Path(raw_source).relative_to(Path.cwd()))

        # Resolve source or glob.
        for file_or_dir in Path(".").glob(raw_source):
            if not Path(file_or_dir).exists():
                print(f"{file_or_dir} doesn't exist. Skipping.")
                continue

            # Resolve symlinks or "../"
            file_or_dir = Path(file_or_dir).resolve()

            # Collect file(s)
            if file_or_dir.is_dir():
                files.extend(
                    [
                        str(file.relative_to(Path.cwd()))
                        for file in file_or_dir.rglob("*.*")
                    ]
                )
            else:
                files.append(str(file_or_dir.relative_to(Path.cwd())))

    def is_dotfile_or_folder(filename: str):
        """ Returns True if the file or any parent folder starts with '.' """
        return Path(filename).stem.startswith(".") or any(
            part.startswith(".") for part in Path(filename).parts
        )

    is_ignored = make_ignore_matcher(ignore_paths)

    # Filter out any dotfiles
    files = [file for file in files if not is_dotfile_or_folder(file)]

    # Filter out any ignored paths
    files = [file for file in files if not is_ignored(file)]

    return files


def clean_output_folder(outdir):
    """ Remove all files present in our output folders. """

    if outdir.exists():
        shutil.rmtree(outdir)


if __name__ == "__main__":
    main()
