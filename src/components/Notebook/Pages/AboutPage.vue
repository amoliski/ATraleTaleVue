<template>
  <Page>
    <template v-slot:head>About</template>
    <div style="margin-top: 30px">
      This is a fun project.
    </div>
  </Page>
</template>

<script>
  import Page from "./Page";
  export default {
    name: "AboutPage",
    components: {Page},
  }
</script>

<style lang="scss">
  .__about_page__ {

  }
</style>
