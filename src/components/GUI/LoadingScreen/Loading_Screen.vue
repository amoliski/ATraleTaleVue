<template>
  <div class="__loading_screen__">
    <div class="container">
      <div class="title">A Trail Tale</div>
      <div class="unity">
        Powered by UNITY<img class='logo' src="~@/assets/loader/unity-brands.svg"/>
      </div>
      <CoverAnimation class="animation"/>
      <div class="sub_line">Join me as I hike the <br/> <b>Appalachian Trail</b></div>
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

export default {
  name: "Loading_Screen",
  components: {CoverAnimation, LoadingBar},
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
  padding: 35px;
  grid-template-rows: 1fr 50px;

  .animation {
    transform: scale(.75);
    @media screen and (max-width: 600px){
      transform: scale(.55);
    }
  }
  .container{
    background-color: #1F8E59;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    @media screen and (max-height: 829px){
      justify-content: flex-start;
    }

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
