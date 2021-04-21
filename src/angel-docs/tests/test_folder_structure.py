"""
* Project Name: AngelDocs
* File Name: test_folder_structure.py
* Programmer: Kai Prince
* Date: Tue, Mar 23, 2021
* Description: This file contains tests for the nested folder structure feature.
"""
from pathlib import Path
import pytest
from main import build_docs, resolve_file_sources


@pytest.mark.parametrize(
    ("working_dir", "source_dir"),
    [
        (None, "project"),
        pytest.param(
            "project",
            "../project/",
            marks=pytest.mark.skip("Walking up guarding not yet implemented."),
        ),
        ("project", "."),
    ],
)
@pytest.mark.parametrize(
    ("source_paths", "expected_paths"),
    [
        [
            [
                "setup.py",
                "module/__init__.py",
                "module/file.py",
                ".ignoreme",
                ".ignoremetoo/ignored.py",
            ],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
        [
            ["**/*.*"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
    ],
)
def test_folder_nesting(
    working_dir,
    source_dir,
    source_paths,
    expected_paths,
    change_test_dir,
):
    """ Builds the output folder structure to match the input folder structure. """
    # Arrange
    if working_dir is not None:
        change_test_dir(working_dir)
    if callable(source_dir):
        source_dir = source_dir()

    sources = [f"{source_dir}/{path}" for path in source_paths]
    output_dir = "output"
    expected = [f"{output_dir}/{source_dir}/{path}" for path in expected_paths]

    # Act
    files = resolve_file_sources(sources)
    build_docs(files, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()
    assert not Path("output/.ignoreme").exists()
    assert not Path("output/.ignoremetoo").exists()


@pytest.mark.parametrize(
    ("working_dir", "source_dir"),
    [
        (lambda: str(Path.cwd().absolute()), "project"),
    ],
)
@pytest.mark.parametrize(
    ("source_paths", "expected_paths"),
    [
        [
            [
                "setup.py",
                "module/__init__.py",
                "module/file.py",
                ".ignoreme",
                ".ignoremetoo/ignored.py",
            ],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
        [
            ["**/*.*"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
        [
            [""],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
    ],
)
@pytest.mark.usefixtures("change_test_dir")
def test_folder_nesting_absolute_path(
    working_dir,
    source_dir,
    source_paths,
    expected_paths,
):
    """ Builds the output folder structure to match the input folder structure. """

    # Arrange
    if callable(working_dir):
        working_dir = working_dir()

    sources = [f"{working_dir}/{source_dir}/{path}" for path in source_paths]
    output_dir = "output"
    expected = [
        f"{working_dir}/{output_dir}/{source_dir}/{path}" for path in expected_paths
    ]

    # Act
    files = resolve_file_sources(sources)
    build_docs(files, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()
    assert not Path("output/.ignoreme").exists()
    assert not Path("output/.ignoremetoo").exists()


@pytest.mark.parametrize(
    ("source_paths", "expected_paths"),
    [
        [
            ["project"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
    ],
)
@pytest.mark.usefixtures("change_test_dir")
def test_recurse_folder(source_paths, expected_paths):
    """ Resursively searches the children when given a folder. """

    # Arrange
    output_dir = "output"
    expected = [f"{output_dir}/project/{path}" for path in expected_paths]

    # Act
    files = resolve_file_sources(source_paths)
    build_docs(files, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()
    assert not Path("output/.ignoreme").exists()
    assert not Path("output/.ignoremetoo").exists()
