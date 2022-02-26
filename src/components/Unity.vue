<template>
  <div class="__unity__">
    <div id="unity-container" class="unity-desktop" ref="container">
      <canvas id="unity-canvas" ref="canvas"/>
      <div id="unit-progress-bar-empty" ref="unityLoadingBar">
        <div id="unity-progress-bar-full" ref="loadingBarFull"></div>
      </div>
    </div>
  </div>
</template>

<script>

import {EventBus} from '@/event_bus.js';

const config = {
  dataUrl: process.env.VUE_APP_DATA_URL,
  frameworkUrl: process.env.VUE_APP_FRAMEWORK_URL,
  codeUrl: process.env.VUE_APP_CODE_URL,
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Andy_AT",
  productVersion: "1.0",
  showBanner: ''
};

export default {
  name: "Unity",
  data() {
    return {
      unity: null,
      loaded: false,
    };
  },
  mounted() {
    const send_message = ({method, message}) => {
      if (!this.unity) {
        console.log('unity not mounted, can\'t send message', method, message);
        return;
      }
      console.log("Sending: WebInterface", {method, message});
      this.unity.SendMessage('WebInterface', method, message);
    }
    window.send_unity_message = send_message;

    EventBus.$on('unity_message', send_message)
    window.messagePump.registerListener('scene_loaded', () => {
      this.loaded = true;
    });

    const canvas = this.$refs.canvas;
    let fn = () => {
      EventBus.$emit('unity_message', {
        method: 'changeScene',
        message: this.$store.getters.active.scene,
      })
    }
    window.messagePump.registerListener('scene_loaded', () =>{
      fn();
      fn = () => {}
    });



    window.createUnityInstance(canvas, config,  (e) => {
      EventBus.$emit('load_progress', e);
    })
      .catch(console.log)
      .then(e => {
        this.unity = e;
        window.unity = e;
      });
  },
}
</script>

<style lang="scss">
.__unity__ {
  width: 100%;
  height: 100%;
  overflow: hidden;
  canvas {
    height: 100vh;
    width: 100vw;
  }
}
</style>
