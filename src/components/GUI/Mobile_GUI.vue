<template>
  <div class="__mobile_gui__">
    <DebugMenu @close="debug_menu_open = false" :open="debug_menu_open"/>
    <NotebookMenu @close="notebook_menu_open = false" :open="notebook_menu_open"/>
    <InfoDisplay :open="info_display_open" @close="info_display_open = false"/>
    <LocationDemo :open="scene_editor_open" @close="scene_editor_open = false"/>
    <MoraleDemo :open="mood_editor_open" @close="mood_editor_open = false"/>
    <div class="container">
      <div class="row">
        <div class="top_left" v-if="!live_mode">
          <div class="location_block">
            <BorderBox padding="3">
              <div style="background: #fff1e0; height:75px">
                <h1 class="page_title">
                  A Trail Tale
                </h1>
                <p style="font-size: 0.9em">
                  Full site to launch <span style="color: #d9935e;">April 4th</span>
                </p>
              </div>
            </BorderBox>
          </div>
        </div>
        <div class="top_left" v-if="live_mode">
          <div class="location_block">
            <BorderBox padding="0">
              <h1>{{$store.getters.active.location}}</h1>
              <p>2:14pm - Sunny</p>
            </BorderBox>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="top_right" style="width: 75px" v-if="!live_mode">
          <BorderButton @click="info_display_open = !info_display_open">
            <div class="about_button">
              <div class="icon">
                <img src="@/assets/question.png"/>
              </div>
              <div class="text">About</div>
            </div>
          </BorderButton>
        </div>
        <div class="top_right"  v-if="live_mode">
          <button @click="notebook_menu_open = !notebook_menu_open">
            <BorderBox padding="3" :style="{width: '80px', overflow: 'hidden'}">
              <div>
                <img height='30px' src="@/assets/icons/Notebook.png" alt=""/>
              </div>
              <div>Menu</div>
            </BorderBox>
          </button>

          <button @click="debug_menu_open = !debug_menu_open" style="margin-top: 5px;" v-if="false">
            <BorderBox padding=3 :style="{width: '80px', overflow: 'hidden'}">
              <div>
                <img height='30px' src="@/assets/icons/debug.png" alt="">
              </div>
              <div>Debug</div>
            </BorderBox>
          </button>
        </div>
      </div>

      <div class="spacer"></div>

      <div class="bottom row">

        <div style="display: flex; flex-direction: row;" v-if="live_mode">
          <BorderBox style="min-width: 150px;" padding="0">
            <div class="large">1292 Mi</div>
            <div>Day 115</div>
          </BorderBox>
          <div style="flex-grow:1; width: 100%; margin-left: 1em;">
            <StatBars compact></StatBars>
          </div>
        </div>

        <div style="display: flex; flex-direction: row;" v-if="!live_mode">

          <BorderButton @click="scene_editor_open = !scene_editor_open">
            <div class="scene_mood_button">
              <img class='icon' src="~@/assets/icons/scene.png"/>
              <div class="text">Scene</div>
            </div>
          </BorderButton>

          <BorderButton @click="mood_editor_open = !mood_editor_open" style="margin-left: .25em">
            <div class="scene_mood_button">
              <img class='icon' src="~@/assets/icons/disposition.png"/>
              <div class="text">Mood</div>
            </div>
          </BorderButton>

          <div style="flex-grow:1; margin-left: .5em; margin-right: 1em;">
            <StatBars compact></StatBars>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox';
import DebugMenu from '@/components/GUI/DebugMenu';
import StatBars from '@/components/MobileStatBars';
import NotebookMenu from '@/components/Notebook/NotebookMenu';
import InfoDisplay from '@/components/GUI/InfoDisplay';
import LocationDemo from "./LocationDemo";
import MoraleDemo from "./MoraleDemo";
import BorderButton from "../BorderButton";

export default {
  name: "Mobile_GUI",
  components: {
    BorderBox,
    BorderButton,
    DebugMenu,
    StatBars,
    NotebookMenu,
    InfoDisplay,
    LocationDemo,
    MoraleDemo
  },
  data() {
    return {
      debug_menu_open: false,
      notebook_menu_open: false,
      info_display_open: false,
      scene_editor_open: false,
      mood_editor_open: false,
    };
  },
  computed: {
    live_mode() {
      return this.$store.state.mode === 'live';
    },
  },
  mounted() {
    //window.messagePump.registerListener('unity_loaded', this.unity_loaded);
  },
}
</script>

<style lang="scss">
.__mobile_gui__ {
  position: absolute;
  image-rendering: pixelated;
  height: 100%;
  width: 100%;
  color: #36634d;
  pointer-events: none;
  .page_title{
    font-size: 3em;
    text-align: start
  }

  .scene_mood_button{
    pointer-events: all;
    display: flex;
    flex-direction:column;
    font-family: 'Pexico';
    color: #36634d;
    align-items: center;
    width: 50px;
    height: 50px;
    .icon {
        width: 36px;
    }
    .text {
      font-size: 1.2em;
    }
  }
  .about_button{
    pointer-events: all;
    display: flex;
    flex-direction:column;
    font-family: 'Pexico';
    align-items: center;
    width: 50px;
    height: 50px;
    .icon img{
      width: 30px;
      margin-top: -5px;
    }
    .text {
      font-size: 1em;
    }
  }

  .large {
    font-size: 1.5em;
    padding: 6px;
    margin: 0;
    padding-top: 10px;
    margin-bottom: 5px;
    box-sizing: border-box;
    text-align: start;
    width: 100%;
    background-color: #f1dfcb;
  }
  .top_right {
    display: flex;
    flex-direction: column;
    width:75px;
    justify-content: center;
    align-items: center;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .location_block {
    h1{
      margin: 0;
      font-size: 1.7em;
      padding: 6px;
      padding-bottom: 5px;
      background-color: #fff1e0;
    }
    p {
      padding: 6px;
      margin: 0;
      padding-top: 10px;
      box-sizing: border-box;

      text-align: start;

      width: 100%;
      background-color: #fff1e0;
    }
  }
  .journal_container {
    display: flex;
    align-items: flex-end;
  }
  .spacer {
    flex-grow: 1;
  }
  .row {
    display: flex;
    flex-direction: row;
    padding: 20px;
  }
  .bottom.row{
    padding: 5px;
    height: 100px;
    background: #1f8e59;
    border-top: 5px solid #4ca57a;
  }

  .container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }
}
</style>
