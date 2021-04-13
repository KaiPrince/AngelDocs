# Using AngelDocs

## Github Action

To use the github action, add this snippet.

```yaml
# Run our action to document our code
- uses: KaiPrince/AngelDocs@latest
with:
    files: src
    folder: dist
    base-url: AngelDocs # REPLACE WITH BASE PATH FROM ROOT
    project-name: Angel-docs # REPLACE WITH YOUR PROJECT NAME
```

It is recommended to replace `latest` with the most recent version.

### Sample workflow

This is a basic workflow which generates the documentation site and deploys
to GitHub Pages.

```yaml
name: Generate Documentation

on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [main]
  pull_request:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  document:
    name: Document and deploy
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      # Run our action to document our code
      - uses: KaiPrince/AngelDocs@latest
        with:
          files: src
          folder: dist
          base-url: AngelDocs # REPLACE WITH YOUR REPO NAME
          project-name: Angel-docs # REPLACE WITH YOUR PROJECT NAME

      # Publish to Pages
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.0
        with:
          branch: gh-pages # The branch the action should deploy to.
          folder: dist # The folder the action should deploy.
```
