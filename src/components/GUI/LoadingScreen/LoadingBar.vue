<template>
  <div class="__loading_bar__">
    <div class="progress" :style="{transform: `scaleX(${progress}%)`}"></div>
  </div>
</template>

<script>
import {EventBus} from '@/event_bus.js';

export default {
  name: "LoadingBar",
  data() {
    return {
      progress: 0
    };
  },
  mounted() {
    const load_progress = (e) => {
      this.progress = e;
    }

    window.messagePump.registerListener('unity_loaded', () => {
      this.progress = 100;
      EventBus.$off('load_progress', load_progress);
    });
    EventBus.$on('load_progress', load_progress);
  }
}
</script>

<style lang="scss">
.__loading_bar__ {
  background-color: #1a3722;
  width: auto;
  margin: 11px 0 0;
  box-sizing: content-box;
  height: 35px;
  .progress {
    transition: transform 1s ease;
    transform-origin: left;
    height: 100%;
    background-color: #f1dfcb;
  }
}
</style>
