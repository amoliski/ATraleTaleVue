<template>
  <Page class="__log_page__">
    <template v-slot:head>
      <h1>Last Updated <b>18 hours ago</b></h1>
    </template>

    <img src="@/assets/notebook/Map.png">
  </Page>
</template>

<script>
import Page from "./Page";
export default {
  name: "LogPage",
  components: {Page},
}
</script>

<style lang="scss">
.__log_page__ {

}
</style>
