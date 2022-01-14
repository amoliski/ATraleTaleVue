<template>
  <div class="__border_box__" :style="{
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
    border: 12px solid transparent;
    border-image: url('~@/assets/border/full.png');
    border-image-slice: 6 fill;
    border-image-source: url('~@/assets/border/full.png');
    border-image-width: 12px;
    box-sizing: border-box;
  }
</style>
