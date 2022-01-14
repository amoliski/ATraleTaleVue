<template>
  <Page class="__journal_page__">
    <template v-slot:head>
      <h1>Last Updated <b>18 hours ago</b></h1>
    </template>

    <div class="journal_head">
      <h2>April 30</h2>
      <div class="entry_number">#24</div>
    </div>
    <div style="width: calc(100% - 60px); margin-bottom: 30px; text-align: start; padding: 5px 30px">
      Decent 15 miler today! I think I'm really starting to get my hiker-legs. I'll be passing through the Great
      Smokey Mountains soon. Fingers crossed I'll see another black bear.
    </div>
    <img src="@/assets/notebook/Polaroid.png" style="width:calc(100% - 250px)" alt="A pixelated image of a mountain"/>

  </Page>
</template>

<script>
import Page from "./Page";
export default {
  name: "JournalPage",
  components: {Page},
}
</script>

<style lang="scss">
.__journal_page__ {
  .journal_head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px 10px;
    border-bottom: 2px dashed #f5e6d5;
  }
  .entry_number{
    color: #816647;
  }
}
</style>
