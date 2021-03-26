/*
 * Project Name: AngelDocs
 * File Name: utils.js
 * Programmer: Kai Prince
 * Date: Thu, Mar 25, 2021
 * Description: This file contains utility functions.
 */
const glob = require("glob");
const _ = require("lodash");

const PROJECTS_DIR = "projects";

const searchFiles = (globPattern) => glob.sync(globPattern).map((f) => "/" + f);

const makeSidebarLinks = (globPattern = `${PROJECTS_DIR}/**/*.md`) => {
  const allFiles = searchFiles(globPattern);

  const projects = allFiles.reduce((acc, file) => {
    const project = file.split("/")[2];
    const projectLink = `/${file.split("/")[1]}/${project}/`;
    const fileName = file.slice(
      file.lastIndexOf("/") + 1,
      file.lastIndexOf(".")
    );
    const fileLink = file.slice(0, file.lastIndexOf("."));

    const result = {
      [projectLink]: [
        {
          text: _.capitalize(project),
          children: [
            ...(acc[projectLink] ? acc[projectLink][0].children : []),
            {
              text: fileName,
              link: fileLink,
            },
          ],
        },
      ],
    };
    return result;
  }, {});

  return projects;
};

const makeNavLinks = (globPattern = `${PROJECTS_DIR}/*`) =>
  searchFiles(globPattern).map((link) => ({
    text: _.capitalize(link.split("/").reverse()[0]),
    link: link + "/",
  }));

module.exports = { makeSidebarLinks, makeNavLinks };
