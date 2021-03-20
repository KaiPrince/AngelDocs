# AngelDocs
Generate beautiful and comprehensive documentation from source.

Supports multiple languages and multi-project repos.

## Motivation
Use this application to share knowledge and document intentions by code authors about specific pieces of code.
Accessible and comprehensive documentation benefits visitors to the code and speeds up the onboarding process.
It is also useful to preserve knowledge as developers come and go.
By keeping the documentation as part of the source itself (internal documentation) as opposed to a seperate
library of documents and technical diagrams (external documentation), the documentation grows along with the
code. This keeps it relevant, useful, and available.

This project was inspired by the principles of _Living Documentation_.

## Screenshots
[TODO]

## Features
Features summarized:
* Write comments in Markdown
* Output to HTML or Markdown
* Supports multiple languages
* Supports multiple projects
* Write guides in markdown
* Semi-automatic documentation generator
* Browse class heirarchies
* Read through source code

### Guides
A conceptual overview of the project.

[TODO: Add screenshot]

Authored guides can be added as Markdown files in the _docs_ directory.
These files are automatically added to the project page's table of contents.

### Class heirarchy
A high-level view of the project's modules and their interactions.

[TODO: Add screenshot]

Classes, interfaces, functions, etc. are mapped and linked. If available, API docs are generated.
Any markdown files found in the same folder are added to the page.

### Literate source code
A low-level view of the individual source files.

[TODO: Add screenshot]

Docstrings and source comments are displayed alongside their relevant code sections.
Any markdown files found in the same folder are added to the page.
Markdown comments are supported.

_(Literate here refers to [Literate Programming](https://en.wikipedia.org/wiki/Literate_programming))_

## Languages
Document generation is delegated to the appropriate library for the project language.
This can be overriden in the configuration.

### Language libraries
* Python: Pyccoon
* JavaScript: ESDocs
* C/C++: DOxygen
* Other: NaturalDocs

## Configuration
Create a `.angeldocs` file in the root directory.

[TODO]

## Tech/Framework used
* VuePress (static site generation)
* Pycco/Pyccoon (Python document generation)
* ESDocs (JavsScript document generation)
* DOxygen (C/C++ document generation)
* NaturalDocs (Any-language document generation)
