const { description } = require("../package.json");

const { projects } = require("../siteConfig.json");
const project_links = projects.map((project) => ({
  text: project.name,
  link: project.path,
  target: "_blank",
  rel: "noopener noreferrer",
}));

module.exports = {
  title: process.env.APP_TITLE || "AngelDocs",
  description: description,

  themeConfig: {
    repo: "KaiPrince/AngelDocs",
    docsDir: "docs",
    editLinks: true,

    logo: "/logo-icon.png",
    nav: [
      {
        text: "Guide",
        link: "/guide/",
        activeMatch: "^/guide/",
      },
      {
        text: "Config",
        link: "/config/",
        activeMatch: "^/config/",
      },
      ...project_links,
      {
        text: "VitePress",
        link: "https://vitepress.vuejs.org",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          children: [{ text: "using-vue", link: "/guide/using-vue" }],
        },
      ],
    },
  },
};
