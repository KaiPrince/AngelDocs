#!/bin/sh -l

# * Project Name: AngelDocs
# * File Name: action.sh
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains a github action.

export ANGELDOCS_MAIN=/app/src/angel-docs/main.py
export STATICSITE_MAIN=/app/docs
# Also requires $FOLDER as the output folder.

./build.sh

