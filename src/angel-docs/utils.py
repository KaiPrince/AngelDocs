"""
* Project Name: Angel-Docs
* File Name: utils.py
* Programmer: Kai Prince
* Date: Tue, Apr 20, 2021
* Description: This file contains utility functions.
"""
from pathlib import Path


def make_ignore_matcher(ignore_paths):
    # This is a very slow way to check for ignored files.
    ignored_files = [str(path) for x in ignore_paths for path in Path(".").glob(x)]

    def is_ignored(filename: str):
        """ Returns True if the file matches an ignored path. """
        return filename in ignored_files

    return is_ignored
