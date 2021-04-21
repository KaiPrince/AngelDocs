"""
* Project Name: Angel-Docs
* File Name: test_ignore_empty_files.py
* Programmer: Kai Prince
* Date: Tue, Apr 20, 2021
* Description: This file contains tests for the ignore empty files feature.
"""

import pytest
from pathlib import Path
from main import build_docs, resolve_file_sources


@pytest.mark.usefixtures("change_test_dir")
def test_ignore_empty_files():
    """ Does not include empty generated files in output. """

    # Arrange
    output_dir = "output"
    source_paths = ["project"]
    expected_not_files = ["empty_file.md", "unsupported_type.md"]
    expected_not_paths = [f"{output_dir}/project/{path}" for path in expected_not_files]

    # Act
    files = resolve_file_sources(source_paths)
    build_docs(files, output_dir)

    # Assert
    for path in expected_not_paths:
        assert not Path(path).exists()
