"""
* Project Name: AngelDocs
* File Name: config.py
* Programmer: Kai Prince
* Date: Sun, Mar 21, 2021
* Description: This file contains config values.
"""
from pathlib import Path


documents_path = Path(__file__).parent.joinpath("../../site/projects").resolve()
build_path = Path(__file__).parent.joinpath("output").resolve()
