"""
* Project Name: AngelDocs
* File Name: conftest.py
* Programmer: Kai Prince
* Date: Tue, Apr 13, 2021
* Description: This file contains config for tests.
"""
import os
import pytest
import shutil


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