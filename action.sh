#!/bin/sh -l

# * Project Name: AngelDocs
# * File Name: action.sh
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains a github action.

# Run document generator
python src/angel-docs/main.py "$@"

# Run static site builder
yarn --cwd docs build


# Copy site to output folder
cp -f -R docs/.vitepress/dist $FOLDER