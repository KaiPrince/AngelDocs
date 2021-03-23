const { description } = require("../package.json");

const { projects } = require("../siteConfig.json");
const navLinks = projects.map(({ text, link }) => ({
  text,
  link,
}));

const sidebarLinks = projects.reduce(
  (acc, { link, tree }) => ({
    ...acc,
    [link]: tree,
  }),
  {}
);

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
      ...navLinks,
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
          ],
        },
        ...navLinks.map((navLink) => ({
          ...navLink,
          collapsable: true,
          children: Object.keys(sidebarLinks).reduce(
            (acc, x) => [...acc, ...sidebarLinks[x]],
            []
          ),
        })),
      ],
      ...sidebarLinks,
    },
  },
};
