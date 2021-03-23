const { description } = require("../package.json");

const { projects } = require("../siteConfig.json");
const nav_links = projects.map(({ text, link }) => ({
  text,
  link,
}));

const sidebar_links = projects.reduce(
  (acc, { link, tree }) => ({
    ...acc,
    [link]: tree,
  }),
  {}
);

// Left-pad with '/'
const baseUrl =
  process.env.BASE_URL && String(process.env.BASE_URL).startsWith("/")
    ? process.env.BASE_URL
    : `/${process.env.BASE_URL}`;

module.exports = {
  title: process.env.APP_TITLE || "AngelDocs",
  description: description,
  base: baseUrl || "/",
  themeConfig: {
    repo: process.env.REPO || "KaiPrince/AngelDocs",
    docsDir: process.env.DOCS_DIR || "docs",
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
      ...nav_links,
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
      ...sidebar_links,
    },
  },
};
