#!/bin/sh -l

# * Project Name: AngelDocs
# * File Name: action.sh
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains a github action.

# ..quit on error
set -e

# ..increase memory limit
export NODE_OPTIONS="--max_old_space_size=4096"


# Run document generator
python /app/src/angel-docs/main.py $@

# Run static site builder
yarn --verbose --cwd /app ci:build


# Copy site to output folder
cp -f -R /app/docs/.vitepress/dist $FOLDER