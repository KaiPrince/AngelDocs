#!/bin/sh -l

# * Project Name: AngelDocs
# * File Name: action.sh
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains a github action.

# ..quit on error
set -e


# Run document generator
python /app/src/angel-docs/main.py $@

cat /app/docs/siteConfig.json # temp

# Run static site builder
yarn --cwd /app build


# Copy site to output folder
cp -f -R /app/docs/.vitepress/dist $FOLDER