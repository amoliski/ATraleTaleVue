<template>
  <Page class="__map_page__">
    <template v-slot:head>
      <h1>Last Updated <b>18 hours ago</b></h1>
    </template>
    <div class="grid">
      <div  class="arrow up_arrow">
        <button v-on:click="scroll_up">U</button>
      </div>
      <div  class="arrow down_arrow">
        <button v-on:click="scroll_down">D</button>
      </div>
      <div  class="arrow left_arrow">
        <button v-on:click="scroll_left">L</button>
      </div>
      <div  class="arrow right_arrow">
        <button v-on:click="scroll_right">R</button>
      </div>
      <div v-dragscroll="true" ref="map" class="map_container">
        <div :style="mapStyle" />
      </div>
    </div>
  </Page>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import Page from "./Page";
import Map from '@/assets/notebook/full_map.png'

export default {
  name: "MapPage",
  components: {Page},
  directives: {
    dragscroll
  },
  methods: {
    scroll_up() {
      const map = this.$refs.map;
      map.scroll({
        top: map.scrollTop - 100,
        left: map.scrollLeft,
        behavior: 'smooth'
      })
    },
    scroll_down() {
      const map = this.$refs.map;
      map.scroll({
        top: map.scrollTop + 100,
        left: map.scrollLeft,
        behavior: 'smooth'
      })
    },
    scroll_left() {
      const map = this.$refs.map;
      map.scroll({
        top: map.scrollTop,
        left: map.scrollLeft - 100,
        behavior: 'smooth'
      })
    },
    scroll_right() {
      const map = this.$refs.map;
      map.scroll({
        top: map.scrollTop,
        left: map.scrollLeft + 100,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    const map = this.$refs.map;
    map.scroll({
      top: 1650,
      left: 250,
      behavior: 'smooth'
    })
  },
  computed: {
    mapStyle() {
      return {
        height: '2502px',
        width: '2510px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url('${Map}')`,
      }
    },
  }
}
</script>

<style lang="scss">
.__map_page__ {
  .grid {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 15px 1fr 15px;
    grid-template-rows: 15px 1fr 15px;
    grid-template-areas:
        "a    up   b"
        "left map  right"
        "c    down d";
    flex-direction: row;
  }
  .map_container {
    overflow: hidden;
    height: 100%;
    width: 100%;
    .map {
      user-select: none;
    }
  }
  .arrow {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .up_arrow {grid-area: up;}
  .down_arrow { grid-area: down;}
  .left_arrow {grid-area: left;}
  .right_arrow { grid-area: right;}
  .map_container { grid-area: map;}
}
</style>

