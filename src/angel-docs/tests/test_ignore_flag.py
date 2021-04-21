"""
* Project Name: AngelDocs
* File Name: test_ignore_flag.py
* Programmer: Kai Prince
* Date: Mon, Apr 19, 2021
* Description: This file contains test for a --ignore flag.
"""

from pathlib import Path
from utils import make_ignore_matcher
import pytest
from main import build_docs, resolve_file_sources


@pytest.mark.parametrize(
    ("source_paths", "ignore_paths", "expected_paths", "expected_not_paths"),
    [
        [
            ["project"],
            ["project/module/**/*"],
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
            ["project/module/**/*"],
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


@pytest.mark.parametrize(
    ("pattern", "paths"),
    [
        [
            ".\\venv\\**\\*",
            [
                "venv\\Scripts\\symilar.exe",
                "venv\\Scripts\\pythonw.exe",
                "venv\\Lib\\site-packages\\_distutils_hack\\override.py",
            ],
        ],
        [
            ".\\**\\*cache*\\**\\*",
            [
                "__pycache__\\main.cpython-39.pyc",
                "__pycache__\\config.cpython-39.pyc",
                "tests\\__pycache__\\conftest.cpython-39-pytest-6.2.2.pyc",
            ],
        ],
    ],
)
def test_pattern_match(pattern, paths):
    """ Unit test for path matching algorithm. """
    # Arrange
    is_ignored = make_ignore_matcher([pattern])

    # Act
    ignored_paths = [path for path in paths if is_ignored(path)]

    # Assert
    for path in paths:
        assert path in ignored_paths
