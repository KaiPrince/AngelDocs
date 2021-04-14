#!/bin/sh -l

# Project Name: AngelDocs
# File Name: build.sh
# Programmer: Kai Prince
# Date: Tue, Apr 13, 2021
# Description: This file contains the build script.

# ..quit on error
set -e

# The main.py file for the main AngelDocs app.
AngelDocsMain="${ANGELDOCS_MAIN:-src/angel-docs/main.py}"

# The directory containing the 'package.json' file of the static site generator.
StaticSiteMain="${STATICSITE_MAIN:-docs}"

# The output folder for the finished build.
OutputFolder="${FOLDER:-dist}"

# The source files to use.
Source="${@:src}"

# Run document generator
python $AngelDocsMain $@

# Run static site builder
yarn --cwd $StaticSiteMain build


# Copy site to output folder
cp -f -R $StaticSiteMain/.vitepress/dist $OutputFolder
