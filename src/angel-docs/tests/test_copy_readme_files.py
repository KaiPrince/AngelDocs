"""
* Project Name: AngelDocs
* File Name: test_copy_readme_files.py
* Programmer: Kai Prince
* Date: Tue, Apr 13, 2021
* Description: This file contains tests for the "Copy readme files" feature.
"""

from main import build_docs, resolve_file_sources
from pathlib import Path


def test_copy_readme_file(change_test_dir):
    """ Copies all .md files from the source folder to the output. """
    # Arrange

    sources = ["project"]
    output_dir = "output"

    # Act
    files = resolve_file_sources(sources)
    build_docs(files, output_dir)

    # Assert
    assert Path("output/project/module/Readme.md").exists()
    assert Path("output/project/module/Readme.md").read_text() == "# This is a test\n"
