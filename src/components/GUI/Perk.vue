<template>
  <div class="__perk__" :style="style" :class="perk"/>
</template>

<script>
import perks from './perks';

export default {
  name: "Perk",
  props: {
    perk: {
      default: '',
    },
    size: {
      default: 40
    },
  },
  computed: {
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundImage: 'url('+perks[this.perk].img+')',
      }
    },

  }

}
</script>

<style lang="scss">
.__perk__ {
  background-size: cover;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
</style>
