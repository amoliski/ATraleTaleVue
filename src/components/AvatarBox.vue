<template>
  <div class="__avatar_box__">
    <component :is="box_element" padding="1">
      <div class="character"
           :style="{background: image_bg_color
      }">
        <img v-if="image" :src="dialogue_img" :style="{height: `${size}px`,width: `${size}px`}"/>
      </div>
    </component>
    <component v-if="dialog_box" :is="box_element" :style="{transform: `translateX(-${border_size}px)`}">
      <div class="textField"
           :style="{color: text_color, background: text_bg_color}"
      >
        "{{$store.getters.active.blurb}}"
      </div>
    </component>
  </div>
</template>

<script>
import Border_box from "./BorderBox";
import images from './images.js'



export default {
  name: "AvatarBox",
  components: {Border_box},
  props: {
    size: {
      default: 128,
    },
    image: {
      default: 'Neutral_1',
    },
    dialog_box: {
      default: true,
    },
    border:{
      default: true
    },
    text_color:{
      default: '#fff1e0',
    },
    text_bg_color:{
      default: '#1a3722',
    },
    image_bg_color:{
      default: '#1f8e59',
    },
  },
  data() {
    return {
      interval: null,
    };
  },
  computed: {
    box_element() {
      return this.border ? Border_box : 'div';
    },
    border_size() {
      return +this.$root.border_size;
    },
    dialogue_img() {
      const selected_image = images[this.image];
      return require(`@/assets/dialogue/${selected_image}`)
    }
  }
}



</script>

<style lang="scss">
.__avatar_box__ {
  display: flex;
  position: relative;
  flex-direction: row;
  margin-bottom: 5px;
  .textField{
    height: 100%;
    width: 300px;
    padding: 30px;
    box-sizing: border-box;
    line-height: 1.5em;
  }
  img{
    height: 128px;
    width: 128px;
  }
  .character{
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
    align-items: flex-end;
  }
}
</style>
