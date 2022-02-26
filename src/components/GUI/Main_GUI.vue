<template>
  <div class="__main_gui__">
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
              <div style="height: 86px; width: 270px;">
                <h1 class="page_title">
                  A Trail Tale
                </h1>
                <div class="launch_date zigzag">
                  Full site to launch <span style="color: #d9935e;">April 4th</span>
                </div>
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
            <div style="display: flex; flex-direction: row; transform: translateY(-12px)">
              <BorderBox>{{$store.getters.active.miles}} Mi</BorderBox>
              <BorderBox style="transform: translateX(-12px)">Day {{$store.getters.active.day}}</BorderBox>
            </div>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="top_right" style="width: 140px" v-if="!live_mode">
          <BorderButton @click="info_display_open = !info_display_open">
            <div class="about_button">
              <div class="icon">?</div>
              <div class="text">About</div>
            </div>
          </BorderButton>
        </div>
        <div class="top_right" v-if="live_mode">
          <button @click="debug_menu_open = !debug_menu_open">
            <BorderBox>
              <div :style="{padding:'0 15px'}"><img height='50px' src="@/assets/icons/debug.png" alt=""></div>
              <div>Debug</div>
            </BorderBox>
          </button>
          <button @click="notebook_menu_open = !notebook_menu_open">
            <BorderBox>
              <div :style="{padding:'0 20px'}"><img height='50px' src="@/assets/icons/Notebook.png" alt=""></div>
              <div>Menu</div>
            </BorderBox>
          </button>
        </div>
      </div>

      <div class="spacer"></div>

      <div class="row">

        <div style="display: flex; flex-direction: column; align-self: flex-end">
          <AvatarBox :image="$store.getters.active.expression" v-if="live_mode"></AvatarBox>
          <StatBars></StatBars>
        </div>

        <div class="spacer"></div>
        <div class="journal_container" v-if="live_mode">
          <BorderBox>
            Journal
          </BorderBox>
        </div>
        <div style="display: flex; flex-direction: column">
          <div style="color: white; font-size: 1.25em; margin-bottom: 5px; user-select: none">Click to change</div>
          <div style="display: flex; flex-direction: row;" v-if="!live_mode">
            <BorderButton @click="scene_editor_open = !scene_editor_open">
              <div class="scene_mood_button">
                <img class='icon' src="~@/assets/icons/scene.png"/>
                <div class="text">Scene</div>
              </div>
            </BorderButton>
            <BorderButton  @click="mood_editor_open = !mood_editor_open" style="margin-left: 1em">
              <div class="scene_mood_button">
                <img class='icon' src="~@/assets/icons/disposition.png"/>
                <div class="text">Mood</div>
              </div>
            </BorderButton>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox';
import StatBars from '@/components/StatBars';
import AvatarBox from '@/components/AvatarBox';
import DebugMenu from '@/components/GUI/DebugMenu';
import NotebookMenu from '@/components/Notebook/NotebookMenu';
import BorderButton from "../BorderButton";
import InfoDisplay from '@/components/GUI/InfoDisplay';
import LocationDemo from "./LocationDemo";
import MoraleDemo from "./MoraleDemo";

  export default {
    name: "Main_GUI",
    components: {
      BorderBox,
      StatBars,
      AvatarBox,
      DebugMenu,
      BorderButton,
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
    mounted() {
      this.$store.dispatch('refresh');
      window.messagePump.registerListener('unity_loaded', this.unity_loaded);
    },
    computed: {
      live_mode() {
        return this.$store.state.mode === 'live';
      },
    },
    methods: {
      unity_loaded() {

      }
    }
  }
</script>

<style lang="scss">
  .__main_gui__ {
    position: absolute;
    image-rendering: pixelated;
    height: 100%;
    width: 100%;
    color: #36634d;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .zigzag::before {
      position: absolute;
      top: -13px;
      left: 0;
      width: 100%;
      height: 15px;
      background-image: linear-gradient(45deg, #f1dfcb 50%, transparent 50%), linear-gradient(-45deg, #f1dfcb 50%, transparent 50%);
      background-size: 15px 30px;
      content: "";
    }

    .about_button{
      display: flex;
      flex-direction:column;
      font-family: 'Pexico';
      align-items: center;
      width: 85px;
      height: 85px;
      .icon {
        margin-top: -5px;
        font-size: 4em;
      }
      .text {
        font-size: 1.6em;
      }
    }
    .scene_mood_button{
      display: flex;
      flex-direction:column;
      font-family: 'Pexico';
      color: #36634d;
      align-items: center;
      width: 85px;
      height: 95px;
      .icon {
        width: 75px;
      }
      .text {
        font-size: 1.5em;
      }
    }
    .location_block {
      h1{
        margin: 0;
        padding: 6px;
        background-color: #fff1e0;
      }
      .launch_date {
        margin-left: -4px;
        margin-right: -6px;
        transform: translateY(5px);
        padding: 6px;
        padding-top: 10px;
        box-sizing: border-box;
        text-align: start;
        background-color: #f1dfcb;
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

    .container {
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
    }
  }
</style>
