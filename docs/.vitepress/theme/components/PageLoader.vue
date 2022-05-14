<template>
  <iframe
    :src="pageRoute"
    allowfullscreen
    style="width: 100vh; height: 100vh"
  />
</template>
<script>
import DefaultTheme from "vitepress/theme";

export default {
  components: { DefaultLayout: DefaultTheme.NotFound },
  computed: {
    pageRoute() {
      const path = String(this.$page.relativePath).replace(".md", ".html");
      const route = this.$withBase("pages/" + path);

      return route;
    },
  },
};

/**
 * Generates paths to all files for the sidebar.
 */
const generateRoutes = (path = "/pages") => {
  // Get file tree

  return [
    {
      text: "Project1",
      children: [
        { text: "test", link: path + "/project1/test" },
        { text: "test2", link: path + "/project1/test" },
      ],
    },
    {
      text: "Project2",
      children: [
        { text: "test", link: path + "/project2/test" },
        { text: "test2", link: path + "/project2/test" },
      ],
    },
  ];
};
</script>
