<template>
  <p>{{ pageRoute }} {{ htmlContent }}</p>
</template>
<script>
import DefaultTheme from "vitepress/theme";

export default {
  data() {
    return {
      htmlContent: "",
    };
  },
  components: { DefaultLayout: DefaultTheme.NotFound },
  computed: {
    pageRoute() {
      const path = String(this.$page.relativePath).replace(".md", ".html");
      const route = this.$withBase("pages/" + path);

      console.log("here");
      return route;
    },
  },
  onMounted() {
    this.fetchHtmlContent();
  },
  methods: {
    fetchHtmlContent() {
      console.log("fetching", this.route);

      fetch(this.route).then((r) => {
        console.log("fetched", r);
        this.htmlContent = r;
      });
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
