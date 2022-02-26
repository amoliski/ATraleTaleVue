<template>
  <div class="__mobile_stat_bars__">
    <div>
      <Border_box class="bar_title" padding="0" :style="title_style.top">F</Border_box>
      <Border_box class="bar_title" padding="0" :style="title_style.bottom">M</Border_box>
    </div>
    <div>
      <Border_box padding="0" class="bar" :style="bar_style">
        <div :style="{width: `${$store.getters.active.fortitude}%`}" class="fatigue progress"></div>
      </Border_box>
      <Border_box
          padding="0"
          class="bar"
          :style="{
            height: `${border_size+40}px`,
            transform: `translateY(-${border_size}px) translateX(-${border_size}px)`
          }">
        <div :style="{width: `${$store.getters.active.sanity}%`}" class="mood progress"></div>
      </Border_box>
    </div>
  </div>
</template>

<script>
import Border_box from "./BorderBox";

export default {
  name: "MobileStatBars",
  components: {Border_box},
  props: {
    compact: {
      default: false,
    },
  },
  data() {
    return {
      stop: false,
      barHeight: 28,
    }
  },
  beforeDestroy() {
    this.stop = true;
  },
  computed: {
    border_size() {
      return +this.$root.border_size -4;
    },
    title_style() {
      const top = { height: `${this.border_size+40}px`, width: `${this.border_size+40}px` };
      return { top, bottom: {...top,transform: `translateY(-${this.border_size}px)`}};
    },
    bar_style() {
      return {
        height: `${this.border_size+40}px`,
        transform: `translateX(-${this.border_size}px)`,
        width: `calc(100vw - 255px)`
      }
    },
  },

}
</script>

<style lang="scss">
.__mobile_stat_bars__ {
  display: flex;
  flex-direction: row;

  .bar_title {
    font-weight: bold;
  }
  .bar {
    height: 30px;
  }
  .progress {
    height: 100%;
    transition: width 1s ease;
  }
  .fatigue{
    background-color: #f0d163;
  }
  .mood{
    background-color: #c2c8ff;
  }
}
</style>
