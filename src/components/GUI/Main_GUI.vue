<template>
  <div class="__main_gui__">
    <DebugMenu @close="debug_menu_open = false" :open="debug_menu_open"/>
    <NotebookMenu @close="notebook_menu_open = false" :open="notebook_menu_open"/>
    <div class="container">
      <div class="row">
        <div class="top_left">
          <div class="location_block">
            <BorderBox padding="0">
              <h1>{{$store.state.location}}</h1>
              <p>2:14pm - Sunny</p>
            </BorderBox>
            <div style="display: flex; flex-direction: row; transform: translateY(-12px)">
              <BorderBox>{{$store.state.miles}} Mi</BorderBox>
              <BorderBox style="transform: translateX(-12px)">Day {{$store.state.day}}</BorderBox>
            </div>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="top_right">
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

        <div style="display: flex; flex-direction: column">
          <AvatarBox :image="$store.state.expression"></AvatarBox>
          <StatBars></StatBars>
        </div>

        <div class="spacer"></div>
        <div class="journal_container">
          <BorderBox>
            Journal
          </BorderBox>
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

  export default {
    name: "Main_GUI",
    components: {
      BorderBox,
      StatBars,
      AvatarBox,
      DebugMenu,
      NotebookMenu
    },
    data() {
      return {
        debug_menu_open: false,
        notebook_menu_open: false,
      };
    },
    mounted() {
      this.$store.dispatch('refresh');
      window.messagePump.registerListener('unity_loaded', this.unity_loaded);
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
    .location_block {
      h1{
        margin: 0;
        padding: 6px;
        background-color: #fff1e0;
      }
      p {
        padding: 6px;
        margin: 0;
        padding-top: 10px;
        box-sizing: border-box;

        text-align: start;

        width: 100%;
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
