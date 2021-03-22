
* Project Name: AngelDocs
* File Name: main.py
* Programmer: Kai Prince
* Date: Sun, Mar 21, 2021
* Description: This file contains the main function.


```python
import shutil
import argparse
from pathlib import Path
import json
import pycco
from markdownify import markdownify

import config



```
This is the entrypoint for the application.

```python
def main():
```

```python

    parser = argparse.ArgumentParser(
        description="Generate beautiful and comprehensive documentation from source."
    )
    parser.add_argument(
        "-p",
        "--project",
        type=str,
        dest="output_dir",
        default="docs",
        help="The name of the project page for these files.",
    )
    parser.add_argument("files", nargs="*", type=Path, help="files to process")

    args = parser.parse_args()

    files = args.files
    project_name = str(args.output_dir)

    project_dir = Path(config.site_dir) / project_name

    outdir = "output"
    site_config_file = Path(config.site_dir) / "siteConfig.json"


```
Clean output folders

```python
    if Path(outdir).exists():
        shutil.rmtree(outdir)
    if project_dir.exists():
        shutil.rmtree(project_dir)
    if site_config_file.exists():
        site_config_file.unlink()


```
Run pycco on files

```python
    pycco.process(files, outdir=outdir, md=True)


```
Make config

```python
    files = [
        {
            "text": file.stem,
            "link": (Path(project_name) / file.relative_to(outdir).stem).as_posix(),
        }
        for file in Path(outdir).iterdir()
    ]
    site_config = {
        "projects": [
            {
                "text": f"{project_name.capitalize()}",
                "link": f"/{project_name}/",
                "tree": files,
            }
        ]
    }

```
Write config file for static site generator.

```python
    site_config_file.write_text(json.dumps(site_config))


```
Create index file

```python
    Path(outdir).joinpath("index.md").write_text(f"# {project_name.capitalize()}")


```
Move files to static site

```python
    shutil.copytree(outdir, project_dir)

    print("Done.")


if __name__ == "__main__":
    main()


```
