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
import pycco
from markdownify import markdownify

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

    # Resolve file globs
    files = []
    for raw_source in args.files:
        for file_or_dir in Path(".").glob(raw_source):
            if file_or_dir.is_dir():
                files.extend([file for file in file_or_dir.rglob("*.*")])
            else:
                files.append(file_or_dir)

    # Get job paths.
    project_name = str(args.output_dir).strip("\"'")
    project_dir = Path(config.site_dir) / project_name
    site_config_file = Path(config.site_dir) / "siteConfig.json"
    outdir = config.outdir

    # Clean output folders
    if outdir.exists():
        shutil.rmtree(outdir)
    outdir.mkdir()

    if project_dir.exists():
        shutil.rmtree(project_dir)
    project_dir.mkdir()

    if site_config_file.exists():
        site_config_file.unlink()

    # Run pycco on files
    pycco.process(files, outdir=str(outdir.resolve()), skip=True, md=True)

    # Post-process files
    for file in outdir.rglob("*.md"):
        content = file.read_text()
        if "<tab>" in content:
            safe_content = content.replace("<tab>", "tab")
            file.write_text(safe_content)

    # Make config
    files = [
        {
            "text": file.stem,
            "link": (Path(project_name) / file.relative_to(outdir).stem).as_posix(),
        }
        for file in outdir.rglob("*.*")
    ]
    site_config = {
        "projects": [
            {
                "text": f"{project_name.capitalize()}",
                "link": f"/{project_name}/",
                "tree": files,
            }
        ]
    }
    # Write config file for static site generator.
    site_config_file.write_text(json.dumps(site_config))

    # Create index file
    (outdir / "index.md").write_text(f"# {project_name.capitalize()}")

    # Move files to static site
    # shutil.copytree(outdir, project_dir)
    for file in outdir.rglob("*.*"):
        file.replace(project_dir / (file.name))

    print("Done.")


if __name__ == "__main__":
    main()