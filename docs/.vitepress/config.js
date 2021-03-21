const description = require("../package.json");

/**
 * Generates paths to all files for the sidebar. */
const generateRoutes = () => {};

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
      {
        text: "Docs",
        link: "/docs/",
        activeMatch: "^/docs/",
      },
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
      "/docs/": [
        {
          text: "Docs",
          children: [{ text: "test", link: "/docs/test" }],
        },
      ],
    },
  },
};
