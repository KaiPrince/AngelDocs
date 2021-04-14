# * Project Name: AngelDocs
# * File Name: Dockerfile
# * Programmer: Kai Prince
# * Date: Mon, Mar 22, 2021
# * Description: This file contains the dockerfile used by Github Actions.
# *   It will run the documentation generator, then the static site generator.


FROM nikolaik/python-nodejs:python3.9-nodejs15


# Set up python
COPY src/angel-docs/requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set up node
COPY docs/package.json /package.json
COPY docs/yarn.lock /yarn.lock
RUN yarn --cwd / --modules-folder /app/docs/node_modules install --frozen-lockfile

COPY . /app
COPY scripts/build.sh /build.sh
RUN chmod +x /build.sh

ENV ANGELDOCS_MAIN=/app/src/angel-docs/main.py
ENV STATICSITE_MAIN=/app/docs

ENTRYPOINT [ "/build.sh" ]
