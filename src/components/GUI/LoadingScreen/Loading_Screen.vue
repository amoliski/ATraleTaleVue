<template>
  <div class="__loading_screen__">
    <div class="container">
      <div class="title">A Trail Tale</div>
      <div class="unity">
        Powered by UNITY
        <img class='logo' src="~@/assets/loader/unity-brands.svg"/>
      </div>
      <div class="animation_container">
        <CoverAnimation class="animation"/>
      </div>
      <div class="sub_line" v-if="!ready">Join me as I hike the <br/> <b>Appalachian Trail</b></div>
      <div class="sub_line" v-if="ready">
        <button @click="$emit('ready')">
          <Border_box class="go_button">
            Let's go!
          </Border_box>
        </button>
        <button @click="$emit('toggle_audio')">
          <Border_box class="go_button">
            <img alt="Audio enabled icon" class="audio_img" v-if="enable_audio" :src="require('@/assets/loader/audio_enabled.png')"/>
            <img alt="Audio disabled icon" class="audio_img" v-else :src="require('@/assets/loader/audio_disabled.png')"/>
          </Border_box>
        </button>
      </div>
    </div>
    <LoadingBar/>
    <div class="background">
      <div class="character">
        <div class="andy" :style="{backgroundImage: `url('${require('@/assets/loader/walk_sprites.png')}')`}"/>
      </div>
    </div>
  </div>
</template>

<script>
import CoverAnimation from './CoverAnimation.vue'
import LoadingBar from './LoadingBar.vue'
import Border_box from "../../BorderBox";

export default {
  name: "Loading_Screen",
  components: {Border_box, CoverAnimation, LoadingBar},
  props: ['ready', 'enable_audio'],
  computed: {
    path() {
      return 'M498.11,206.4,445.31,14.72,248.2,66.08,219,116.14l-59.2-.43L15.54,256,159.82,396.32l59.17-.43,29.24,50,197.08,51.36,52.8-191.62-30-49.63ZM223.77,124.2,374.55,86.51,288,232.33H114.87Zm0,263.63L114.87,279.71H288l86.55,145.81Zm193,14L330.17,256l86.58-145.84L458.56,256Z'
    }
  }
}
</script>

<style lang="scss">
.__loading_screen__ {
  background:#36634d;
  z-index: 10;
  color: #f1dfcb;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  grid-template-rows: 1fr 50px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .animation {
    pointer-events: none;
    transform: scale(.85);
    @media screen and (max-width: 600px){
      transform: scale(.45);
    }
  }
  .audio_img{
    width: 36px;
    height: 36px;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    margin-bottom: -7px;
  }
  .go_button{
    padding: 10px 20px;
    font-size: 30px;
    font-family: 'Pexico', Avenir, Helvetica, Arial, sans-serif;
    color:#36634d;
  }
  .container{
    background-color: #1F8E59;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    @media screen and (max-height: 829px){
      // justify-content: flex-start;
    }

  }
  .animation_container{
    height: 650px;
    @media screen and (max-width: 600px){
      height: 365px;
    }
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .unity {
    font-weight: lighter;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo{
    width: 25px
  }
  .title{
    font-size: 6em;
    @media screen and (max-width: 600px){
      font-size: 3em;
    }
    font-weight: bold;
    letter-spacing: 1.5px;
  }
  .sub_line {
    font-size: 35px;
    line-height: 30px;
    @media screen and (max-width: 600px){
      font-size: 25px;
    }
  }


}
</style>
