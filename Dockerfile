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

WORKDIR /usr/src/app
COPY src/angel-docs/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# TODO: only copy the src folder, specify the output folder,
# and remove the dependencies between stages.
COPY . .

WORKDIR /usr/src/app/angel-docs
RUN [ "python", "main.py" "-p", "${PROJECT_NAME:-angel-docs}", "${FILES:-**/*}"]


# Run static site generator
FROM node

WORKDIR /usr/src/app
COPY --from=documentation /usr/src/app .

WORKDIR /usr/src/app/docs
RUN yarn install --frozen-lockfile

RUN [ "yarn", "build" ]


# Copy site to output folder
WORKDIR /usr/src/app/docs/
ENTRYPOINT [ "cp", "-f", "-R", ".vitepress/dist"]
CMD [ "${FOLDER:-dist}" ]
VOLUME [ "${FOLDER:-dist}" ]

