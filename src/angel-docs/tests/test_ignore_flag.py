"""
* Project Name: AngelDocs
* File Name: test_ignore_flag.py
* Programmer: Kai Prince
* Date: Mon, Apr 19, 2021
* Description: This file contains test for a --ignore flag.
"""

from pathlib import Path
import pytest
from main import build_docs, resolve_file_sources


@pytest.mark.parametrize(
    ("source_paths", "ignore_paths", "expected_paths", "expected_not_paths"),
    [
        [
            ["project"],
            ["module/"],
            ["setup.md"],
            ["module/__init__.md", "module/file.md", "module/Readme.md"],
        ],
    ],
)
@pytest.mark.usefixtures("change_test_dir")
def test_ignore_flag(source_paths, ignore_paths, expected_paths, expected_not_paths):
    """ Does not include files matching the ignore pattern in generated output. """

    # Arrange
    output_dir = "output"
    expected = [f"{output_dir}/project/{path}" for path in expected_paths]
    expected_not = [f"{output_dir}/project/{path}" for path in expected_not_paths]

    # Act
    files = resolve_file_sources(source_paths, ignore_paths=ignore_paths)
    build_docs(files, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()
    for path in expected_not:
        assert not Path(path).exists()


@pytest.mark.parametrize(
    ("source_paths", "ignore_paths", "expected_paths", "expected_not_paths"),
    [
        [
            ["project"],
            ["module/"],
            ["setup.py"],
            ["module/__init__.py", "module/file.py", "module/Readme.md"],
        ],
    ],
)
@pytest.mark.usefixtures("change_test_dir")
def test_resolve_ignored_files(
    source_paths, ignore_paths, expected_paths, expected_not_paths
):
    """ Ignores files matching the ignore pattern. """

    # Arrange
    output_dir = "output"
    expected = [f"project/{path}" for path in expected_paths]
    expected_not = [f"project/{path}" for path in expected_not_paths]

    # Act
    files = resolve_file_sources(source_paths, ignore_paths=ignore_paths)
    build_docs(files, output_dir)

    # Assert
    for path in expected:
        assert str(Path(path)) in files
    for path in expected_not:
        assert str(Path(path)) not in files
