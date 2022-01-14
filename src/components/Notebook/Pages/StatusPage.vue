<template>
  <Page class="__status_page__">
    <template v-slot:head>
      <h1>Last Updated <b>18 hours ago</b></h1>
    </template>
    <div style="justify-content: center; display: flex;">

      <AvatarBox :border="false"
                 :text_color="''"
                 text_bg_color="transparent"
                 image_bg_color="linear-gradient(0deg, rgb(241, 223, 203), rgb(241, 223, 203) 60%,transparent 60%, transparent)"/>
    </div>
    <h3>Current Disposition:</h3>
    <div class="perks">
      <div class="perk_entry" v-for="[perk, data] in perk_list"  :key="perk" >
        <div class="perk">
          <Perk :size="50" :perk="perk"/>
        </div>
        <div class="perk_text">
          <div class="perk_name">{{perk}}</div>
          <div class="perk_description">
            <span v-if='data.sanity !== 0' :class="data.sanity > 0 ? 'morale_positive' : 'morale_negative'">
            Morale
            </span>
            <span v-if='data.fortitude !== 0' :class="data.fortitude > 0 ? 'morale_positive' : 'morale_negative'">
            Fortitude
            </span>
          </div>
        </div>
      </div>
    </div>



  </Page>
</template>

<script>
import Page from "./Page";
import AvatarBox from "../../AvatarBox";
import Perk from "@/components/GUI/Perk"
import perks from "@/components/GUI/perks.js"

export default {
  name: "StatusPage",
  components: {AvatarBox, Page, Perk},
  computed: {
    perk_list() {
      return this.$store.state.perks.map(p => [p, perks[p]]);
    }
  }
}
</script>

<style lang="scss">
.__status_page__ {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .page_head{
    flex-grow: 0;
    height:90px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #816647;
      font-size: 1.15em;
      font-weight: normal;
    }
    &:after {
      position: absolute;
      bottom:0;
      content: '';
      display: block;
      height: 0;
      width: 100%;
      margin-top: 10px;
      border-top: 6px solid #f5e6d5;
      border-bottom: 4px solid #ebdccb;
    }
  }
  .page_content {
    flex-grow: 1;
  }
  .perks {
    text-align:start;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 3em;
    .perk {
      background-color: #eedfcd;
      padding: 10px;
    }
    .perk_entry {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: white;
      margin: 1em;
    }
    .perk_name {
      margin-left: 2em;
    }
    .perk_description{
      margin-top: 4px;
      font-size: 0.8em;
      margin-left: 3em;
      > .morale_positive {
        margin-right: 1em;
        color: #669f7a;
        &::before {
          content: '+'
        }
      }
      > .morale_negative {
        margin-right: 1em;
        color: #f1a28d;
        &::before {
          content: '-'
        }
      }
    }
  }

  .map_container {
    height: 100%;
    overflow: hidden;
    width: 100%;
  }
}
</style>
