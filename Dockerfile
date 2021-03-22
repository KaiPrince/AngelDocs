# * Project Name: AngelDocs
# * File Name: Dockerfile
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains the dockerfile used by Github Actions.
# *   It will run the documentation generator, then the static site generator.

# USAGE:
# Takes these optional env vars:
# * PROJECT_NAME: The name of your project.
# * FILES: The files to process. (Default=**/*)
# * FOLDER: The name of the output folder. (Default=dist)

# Run documentation generator
FROM python:3 as documentation

COPY src/angel-docs/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# TODO: only copy the src folder, specify the output folder,
# and remove the dependencies between stages.
COPY . .

RUN [ "python", "src/angel-docs/main.py", "-p", "${PROJECT_NAME:-angel-docs}", "${FILES:-**/*}"]


# Run static site generator
FROM node

COPY --from=documentation . .

RUN yarn --cwd docs install --frozen-lockfile

RUN [ "yarn", "--cwd", "docs", "build" ]


# Copy site to output folder
ENTRYPOINT [ "cp", "-f", "-R", "docs/.vitepress/dist"]
CMD [ "${FOLDER:-dist}" ]
VOLUME [ "${FOLDER:-dist}" ]

