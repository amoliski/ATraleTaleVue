<template>
  <div class="__border_box__" :class={dark} :style="{
    padding: `${padding}px`,
    borderWidth: `${border_size}px`,
    borderImageWidth: `${border_size}px`,
  }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "border_box",
    props: {
      dark: {
        default: false,
      },
      padding: {
        default: 5,
      }
    },
    computed: {
      border_size(){
        return this.$root.border_size;
      },
    }
  }
</script>

<style lang="scss">
  .__border_box__ {

    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    border: 12px solid transparent;
    border-image: url('~@/assets/border/full.png');
    border-image-source: url('~@/assets/border/full.png');
    border-image-slice: 8 fill;
    border-image-width: 12px;
    box-sizing: border-box;
    &.dark {
      border-image-source: url('~@/assets/border/full_dark.png');
      border-image-slice: 8 fill;
      border-image-width: 12px;
    }
  }
</style>
