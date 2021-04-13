const { description } = require("../package.json");
const { makeNavLinks, makeSidebarLinks } = require("./utils");

// Left-pad with '/'
const baseUrl = process.env.BASE_URL
  ? String(process.env.BASE_URL).startsWith("/")
    ? process.env.BASE_URL
    : `/${process.env.BASE_URL}`
  : null;

module.exports = {
  title: process.env.APP_TITLE || "AngelDocs",
  description: description,
  base: baseUrl || "/",
  head: [
    [
      "link",
      {
        rel: "shortcut icon",
        href: baseUrl ? `${baseUrl}/favicon.ico` : "/favicon.ico",
      },
    ],
  ],
  themeConfig: {
    repo: process.env.REPO || "KaiPrince/AngelDocs",
    docsDir: process.env.DOCS_DIR || "docs",
    editLinks: false,
    logo: "/logo-icon.png",
    nav: [
      {
        text: "Guide",
        link: "/guide/",
        activeMatch: "^/guide/",
      },
      ...makeNavLinks(),
      {
        text: "VitePress",
        link: "https://vitepress.vuejs.org",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          children: [
            { text: "Introduction", link: "/guide/" },
            { text: "Using AngelDocs", link: "/guide/using-angel-docs" },
            { text: "Bungalow Values", link: "/guide/bungalow-values" },
          ],
        },
      ],
      ...makeSidebarLinks(),
    },
  },
};
