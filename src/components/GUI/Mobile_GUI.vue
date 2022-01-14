<template>
  <div class="__mobile_gui__">
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
          </div>
        </div>
        <div class="spacer"></div>
        <div class="top_right">
          <button @click="debug_menu_open = !debug_menu_open">
            <BorderBox padding="3" :style="{width: '80px', overflow: 'hidden'}">
              <div>
                <img height='30px' src="@/assets/icons/Notebook.png" alt=""/>
              </div>
              <div>Menu</div>
            </BorderBox>
          </button>

            <button @click="debug_menu_open = !debug_menu_open" style="margin-top: 5px;">
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

        <div style="display: flex; flex-direction: row;">
          <BorderBox style="min-width: 150px;" padding="0">
            <div class="large">1292 Mi</div>
            <div>Day 115</div>
          </BorderBox>
          <div style="flex-grow:1; width: 100%; margin-left: 1em;">
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

export default {
  name: "Main_GUI",
  components: {
    BorderBox,
    DebugMenu,
    StatBars,
    NotebookMenu
  },
  data() {
    return {
      debug_menu_open: false,
      notebook_menu_open: false,
    };
  },
  mounted() {
    window.messagePump.registerListener('unity_loaded', this.unity_loaded);
  },
  methods: {
    unity_loaded() {

    }
  }
}
</script>

<style lang="scss">
.__mobile_gui__ {
  position: absolute;
  image-rendering: pixelated;
  height: 100%;
  width: 100%;
  color: #36634d;
  button{
    margin: 0;
    padding: 0;
  }
  .large {
    font-size: 1.5em;
    padding: 6px;
    margin: 0;
    padding-top: 10px;
    margin-bottom: 15px;
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
  .bottom.row{
    padding: 5px;
    height: 120px;
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
