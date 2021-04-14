#!/bin/sh -l


# Project Name: AngelDocs
# File Name: install.sh
# Programmer: Kai Prince
# Date: Tue, Apr 13, 2021
# Description: This file contains the install script intended for use by CI.

# The location of the requirements.txt file
AngelDocs_requirements=src/angel-docs/requirements.txt

# The directory containing the 'package.json' file of the static site generator.
StaticSiteMain="${STATICSITE_MAIN:-docs}"

# Set up python
pip install --no-cache-dir -r $AngelDocs_requirements

# Set up node
yarn --cwd $StaticSiteMain install --frozen-lockfile