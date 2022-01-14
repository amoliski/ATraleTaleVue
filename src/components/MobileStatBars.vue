<template>
  <div class="__mobile_stat_bars__">
    <div>
      <Border_box class="bar_title" :style="title_style.top">F</Border_box>
      <Border_box class="bar_title" :style="title_style.bottom">M</Border_box>
    </div>
    <div>
      <Border_box padding="0" class="bar" :style="bar_style">
        <div :style="{width: `${fatigue}%`}" class="fatigue progress"></div>
      </Border_box>
      <Border_box
          padding="0"
          class="bar"
          :style="{
            height: `${border_size+40}px`,
            transform: `translateY(-${border_size}px) translateX(-${border_size}px)`
          }">
        <div :style="{width: `${mood}%`}" class="mood progress"></div>
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
      fatigue: 80,
      targetFatigue: 20,
      mood: 90,
      targetMood: 30,
      stop: false,
      barHeight: 28,
    }
  },
  beforeDestroy() {
    this.stop = true;
  },
  created(){
    this.animate_frame();
  },
  computed: {
    border_size() {
      return +this.$root.border_size;
    },
    title_style() {
      const top = { height: `${this.border_size+40}px`, width: `${this.border_size+40}px` };
      return { top, bottom: {...top,transform: `translateY(-${this.border_size}px)`}};
    },
    bar_style() {
      return {
        height: `${this.border_size+40}px`,
        transform: `translateX(-${this.border_size}px)`,
        width: `calc(100vw - 225px)`
      }
    },
  },
  methods: {
    set_target() {
      //console.log(Math.abs(this.targetMood - this.mood))
      if (Math.abs(this.targetMood - this.mood) < 0.1) {
        this.targetMood = Math.floor(Math.random()*100);
      }
      if (Math.abs(this.targetFatigue - this.fatigue) < 0.1) {
        this.targetFatigue = Math.floor(Math.random()*100);
      }
    },
    animate_frame(){
      requestAnimationFrame(() => {
        if (this.stop) {
          return;
        }
        this.fatigue = this.fatigue + (this.targetFatigue - this.fatigue) * .1;
        this.mood = this.mood + (this.targetMood - this.mood) * .025;
        this.set_target();
        this.animate_frame();
      })
    },
  }
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
  }
  .fatigue{
    background-color: #f0d163;
  }
  .mood{
    background-color: #c2c8ff;
  }
}
</style>
