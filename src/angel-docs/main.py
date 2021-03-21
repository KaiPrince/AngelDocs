"""
* Project Name: AngelDocs
* File Name: main.py
* Programmer: Kai Prince
* Date: Sun, Mar 21, 2021
* Description: This file contains the main function.
"""

import argparse
import pathlib
import pycco


def main():
    parser = argparse.ArgumentParser(
        description="Generate beautiful and comprehensive documentation from source."
    )
    parser.add_argument(
        "-d",
        "--directory",
        type=str,
        dest="output_dir",
        default="docs",
        help="The output directory that the rendered files should go to.",
    )
    parser.add_argument("files", nargs="*", type=pathlib.Path, help="files to process")

    args = parser.parse_args()

    files = args.files
    output_dir = args.output_dir

    # Run pycco on files
    pycco.process(files, outdir=output_dir)


if __name__ == "__main__":
    main()
