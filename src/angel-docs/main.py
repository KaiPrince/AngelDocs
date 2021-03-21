"""
* Project Name: AngelDocs
* File Name: main.py
* Programmer: Kai Prince
* Date: Sun, Mar 21, 2021
* Description: This file contains the main function.
"""
import shutil
import argparse
import pathlib
import json
import pycco

import config


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
    parser.add_argument("files", nargs="*", type=pathlib.Path, help="files to process")

    args = parser.parse_args()

    files = args.files
    project_dir = pathlib.Path(config.docs_dir) / args.output_dir

    # Run pycco on files
    outdir = "output"
    pycco.process(files, outdir=outdir, index=True)

    # Overwrite styling
    sample_styling_file = pathlib.Path("pycco.css")
    styling_file = pathlib.Path(outdir) / "pycco.css"
    styling_file.write_text(sample_styling_file.read_text())

    # Copy to static site
    shutil.copytree(outdir, project_dir)

    # Make config
    site_config = {"projects": [{"name": "Docs", "path": "pages/docs/index.html"}]}

    # Create config file for static site generator.
    site_config_file = pathlib.Path(config.site_dir) / "siteConfig.json"
    site_config_file.write_text(json.dumps(site_config))

    print("Done.")


if __name__ == "__main__":
    main()
