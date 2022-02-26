<template>
  <div class="__stat_bars__">
    <div>
      <Border_box class="bar_title" :padding="0" :style="title_style.top">
        <span>F</span>
      </Border_box>
      <Border_box class="bar_title" :padding="0" :style="title_style.bottom">
        <span>M</span>
      </Border_box>
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
        <div :style="{width: `${$store.getters.active.morale}%`}" class="mood progress"></div>
      </Border_box>
    </div>
  </div>
</template>

<script>
import Border_box from "./BorderBox";

export default {
  name: "StatBars",
  components: {Border_box},
  data() {
    return {
      barHeight: 28,
    }
  },
  computed: {
    border_size() {
      return +this.$root.border_size - 4;
    },
    title_style() {
      const top = { height: `${this.border_size+40}px`, width: `${this.border_size+40}px` };
      return { top, bottom: {...top,transform: `translateY(-${this.border_size}px)`}};
    },
    bar_style() {
      return {
        height: `${this.border_size+40}px`,
        transform: `translateX(-${this.border_size}px)`,
        width: `${425+this.border_size}px`
      }
    },
  },
}
</script>

<style lang="scss">
.__stat_bars__ {
  display: flex;
  flex-direction: row;

  .bar_title {
    font-weight: bold;
    font-size: 1.5em;
    > span {
      display: block;
      transform: translateX(0) translateY(-4px);
    }
  }
   .bar {
     height: 20px;
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
