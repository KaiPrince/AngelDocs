/*
 * Project Name: AngelDocs
 * File Name: utils.js
 * Programmer: Kai Prince
 * Date: Thu, Mar 25, 2021
 * Description: This file contains utility functions.
 */
const _ = require("lodash");
const dirTree = require("directory-tree");
const _path = require("path");

const PROJECTS_DIR = "projects";

const searchFiles = (path, extensions = /^\..*/, callback) =>
  dirTree(
    path,
    {
      extensions,
      normalizePath: true,
    },
    callback
  );

const makeNavLinks = (path = `${PROJECTS_DIR}`) =>
  searchFiles(path).children.reduce(
    (acc, { path, name }) => [
      ...acc,
      {
        text: _.capitalize(name),
        link: `/${path}/`,
      },
    ],
    []
  );

const makeSidebarLinks = (path = `${PROJECTS_DIR}`, ext = /\.md/) => {
  const allFiles = searchFiles(path, ext);

  const makeTree = (node) => {
    if (node.type == "file") {
      const ext = _path.extname(node.path);
      const withoutExt = (path) => path.replace(ext, "");
      const withSpaces = (s) => String(s).replace("-", " ").replace("_", " ");
      return {
        text: withoutExt(node.name),
        link: "/" + withoutExt(node.path),
      };
    } else if (node.type == "directory") {
      return {
        text: _.capitalize(node.name),
        children: node.children.map(makeTree),
      };
    } else {
      throw EvalError(`Unknown node type: ${node.type}`);
    }
  };

  const projects = allFiles.children.reduce(
    (acc, project) => ({
      ...acc,
      [`/${project.path}/`]: [makeTree(project)],
    }),
    {}
  );

  return projects;
};

module.exports = { makeNavLinks, makeSidebarLinks };
