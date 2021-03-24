"""
* Project Name: AngelDocs
* File Name: test_folder_structure.py
* Programmer: Kai Prince
* Date: Tue, Mar 23, 2021
* Description: This file contains tests for the nested folder structure feature.
"""
import os
from pathlib import Path
import shutil
import pytest
from main import resolve_file_sources, build_docs


@pytest.fixture()
def test_files_dir(tmp_path, request):
    """ Copy mock files to temp directory. """
    path_of_current_module = request.fspath.dirname
    FILES_FOLDER = os.path.join(path_of_current_module, "sample")

    # Copy files in test uploads folder to temp directory
    shutil.copytree(FILES_FOLDER, tmp_path, dirs_exist_ok=True)

    yield tmp_path

    # Teardown


@pytest.fixture(scope="function")
def change_test_dir(request, tmp_path):
    os.chdir(tmp_path)
    yield os.chdir
    os.chdir(request.config.invocation_dir)


@pytest.mark.parametrize(
    ("source_paths", "expected_paths"),
    [
        [
            ["setup.py", "module/__init__.py", "module/file.py"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
        [
            ["**/*.*"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
    ],
)
def test_folder_nesting(source_paths, expected_paths, test_files_dir, change_test_dir):
    """ Builds the output folder structure to match the input folder structure. """
    # Arrange
    base_output_dir = Path(test_files_dir) / "output" / "project"
    expected = [base_output_dir / path for path in expected_paths]
    base_source_dir = Path(test_files_dir) / "project"
    sources = source_paths
    # Change working directory (until absolute paths work.)
    change_test_dir(base_source_dir)

    # Act
    # breakpoint()
    build_docs(sources, base_output_dir)

    # Assert
    for path in expected:
        assert path.exists()


@pytest.mark.skip("TODO")
@pytest.mark.parametrize(
    ("source_path", "expected_output_path"),
    [
        ["setup.py", "setup.py"],
        ["crypto/__init__.md", "crypto/__init__.md"],
    ],
)
def test_denormalized_path(
    source_path,
    expected_output_path,
    test_files_dir,
    change_test_dir,
):
    """ Resolves relative paths that include ../ """
    # Arrange
    change_test_dir(os.path.join(test_files_dir, "Crypto"))
    base_source = "../Crypto/"
    base_output = Path(__file__).parent.joinpath("../output/").resolve()

    source = base_source + source_path
    expected = str(base_output.joinpath(expected_output_path))

    # Act
    output_path = resolve_file_sources([source])

    # Assert
    assert output_path == [expected]


@pytest.mark.skip("TODO")
def test_absolute_path():
    """ Resolves absolute paths properly when appending to output dir. """
    pass


@pytest.mark.skip("TODO")
def test_sidebar_links():
    """ Generates the sidebar config that maps to the output folder structure. """
    pass
