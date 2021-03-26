/*
 * Project Name: AngelDocs
 * File Name: nav_links.spec.js
 * Programmer: Kai Prince
 * Date: Thu, Mar 25, 2021
 * Description: This file contains specification tests for the navbar and sidenav
 *   link generation.
 */

const _ = require("lodash");
const { makeNavLinks, makeSidebarLinks } = require("../utils");

beforeAll(() => {
  process.chdir(".vitepress/tests/sample");
});

describe("Navigation bar links", () => {
  it("generates links", () => {
    // Generates the sidebar config that maps to the output folder structure.

    // Arrange
    const expected = [{ link: "/projects/project/", text: "Project" }];

    // Act
    const links = makeNavLinks();

    // Assert
    expect(links).toStrictEqual(expected);
  });
});

describe("Side bar links", () => {
  it("generates nested links", () => {
    // Arrange
    const projectName = "project";
    const expected = {
      [`/projects/${projectName}/`]: [
        {
          text: _.capitalize(`${projectName}`),
          children: [
            {
              text: "__init__",
              link: `/projects/${projectName}/module/__init__`,
            },
            { text: "file", link: `/projects/${projectName}/module/file` },
            { text: "setup", link: `/projects/${projectName}/setup` },
          ],
        },
      ],
    };

    // Act
    const links = makeSidebarLinks();

    // Assert
    expect(links).toStrictEqual(expected);
  });
});
