# * Project Name: AngelDocs
# * File Name: Dockerfile
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains the dockerfile used by Github Actions.
# *   It will run the documentation generator, then the static site generator.


FROM nikolaik/python-nodejs:latest

COPY . .

# Set up python
RUN pip install --no-cache-dir -r src/angel-docs/requirements.txt

# Set up node
RUN yarn --cwd docs install --frozen-lockfile


ENTRYPOINT [ "action.sh" ]
