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
from main import build_docs, make_site_config


@pytest.fixture(autouse=True)
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
            ["setup.py", "module/__init__.py", "module/file.py"],
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
    build_docs(sources, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()


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
            ["setup.py", "module/__init__.py", "module/file.py"],
            ["setup.md", "module/__init__.md", "module/file.md"],
        ],
        [
            ["**/*.*"],
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
    build_docs(sources, output_dir)

    # Assert
    for path in expected:
        assert Path(path).exists()


def test_sidebar_links():
    """ Generates the sidebar config that maps to the output folder structure. """

    # Arrange
    project_name = "project"
    output_dir = "output"
    output_files = [
        f"{output_dir}/setup.md",
        f"{output_dir}/module/__init__.md",
        f"{output_dir}/module/file.md",
    ]
    original = {}
    expected = {
        "projects": [
            {
                "text": f"{project_name.capitalize()}",
                "link": f"/{project_name}/",
                "children": [
                    {"text": "setup", "link": f"/{project_name}/setup"},
                    {
                        "text": "module",
                        "children": [
                            {
                                "text": "__init__",
                                "link": f"/{project_name}/module/__init__",
                            },
                            {"text": "file", "link": f"/{project_name}/module/file"},
                        ],
                    },
                ],
            }
        ]
    }

    # Act
    config = make_site_config(
        project_name, Path(output_dir), [Path(x) for x in output_files]
    )

    # Assert
    assert config == expected
