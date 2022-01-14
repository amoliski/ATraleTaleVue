<template>
  <div class="__menu__" :class="{open}">
    <div class="container">
      <div class="notebook">
        <div class="notebook_cover">
          <div class="notebook_cover_back"></div>
        </div>
        <div class="scene">
          <div class="front_cover">
            <div class="face front cover"></div>
            <div class="face back cover"></div>
            <div class="face left side"></div>
            <div class="face right side"></div>
            <div class="face top_corner"></div>
            <div class="face top_corner a"></div>
            <div class="face top_corner b"></div>
            <div class="face top_corner c"></div>
            <div class="face top_corner d"></div>
            <div class="face top_corner e"></div>
            <div class="face bottom_corner a"></div>
            <div class="face bottom_corner b"></div>
            <div class="face bottom_corner c"></div>
            <div class="face bottom_corner d"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
          <div class="main_book">
            <div class="notebook_pages">

            </div>
            <div class="back_cover"></div>
          </div>
        </div>
        <NotebookTabs :active_tab="active_tab" @change_tab="active_tab = $event"/>
        <div class="pages">
          <div class="page">
            <component :is="active_page"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotebookTabs from "./NotebookTabs";
import MapPage from "./Pages/MapPage";
import StatusPage from "./Pages/StatusPage";
import AboutPage from "./Pages/AboutPage";
import LogPage from "./Pages/LogPage";
import JournalPage from "./Pages/JournalPage";

const page_list = [
    MapPage, StatusPage, JournalPage, LogPage, AboutPage
]

export default {
  name: "Menu",
  components: {
    NotebookTabs
  },
  props: ['open'],
  data() {
    return {
      active_tab: 1,
    }
  },
  computed: {
    active_page() {
      return page_list[this.active_tab -1];
    }
  }
}
</script>

<style lang="scss">

.__menu__ {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  .page {
    position: absolute;
    top: 45px;
    overflow-y: auto;
    bottom: 120px;
    left: 50px;
    right: 30px;
  }

  .container{
    transition: transform 0.5s ease;
    transform: translateY(0); //transform: translateY(100vh);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-delay: .25s;
  }



  @keyframes cover {
    0% { transform: translateX(0px) rotateY(0deg); z-index: 500 }
    50% { transform: translateX(50px) rotateY(-180deg);  z-index: 20;}
    100% { transform: translateX(50px) rotateY(-350deg); z-index: 0; }
  }
  @keyframes cover2 {
    0% { transform: translateX(0px) rotateY(0deg); z-index: 500 }
    50% { transform: translateX(50px) rotateY(-180deg);  z-index: 20;}
    100% { transform: translateX(50px) rotateY(-350deg); z-index: 0; }
  }
  @keyframes rotate {
    0% { transform: translateX(0px) rotateY(250deg); z-index: 500 }
    100% { transform: translateX(0px) rotateY(290deg); z-index: 500; }
  }

  &.open {
    .container {
      animation-name: cover2;
      transform: translateY(0);
      transition-delay: 0s;
    }
    .notebook_cover{
      animation-direction: normal;
    }
  }

  .notebook_cover {
    animation-name: cover;
    animation-duration: 1s;
    position: relative;
    left: -30px;
    transform-origin: left;
    animation: 1s linear cover;
    animation-fill-mode: both;
    animation-direction: reverse;
    z-index: 500;
    transform-style: preserve-3d;
  }

  .notebook_cover_front, .notebook_cover_back{
    position: absolute;
    height: 738px;
    width: 600px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .notebook_cover_front{
    backface-visibility: hidden;
    background-image: url('~@/assets/notebook/Desktop-notebook-cover.png');
  }
  .notebook_cover_back{
    background-image: url('~@/assets/notebook/Desktop-notebook-cover-back.png');
    transform: scaleX(-100%) rotateY(180deg) ;
  }


  .scene {
    z-index: 1000;
    position: absolute;
    top: -200px;
    left: 50px;
    width: 200px;
    height: 200px;
    perspective: 1160px;

    .front_cover, .main_book {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
    }
    .front_cover {
      transform: rotateY(272deg);
      animation-name: rotate;
      animation-duration: 4s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      transform-origin:left;
    }
    .main_book{
      .notebook_pages {
        position: absolute;
        top: 3px;
        z-index: 10;
        bottom: 6px;
        left: -6px;
        right: 10px;
        height: 738px;
        width: 600px;
        background-image: url('~@/assets/notebook/Desktop-notbook_Pages.png');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }

    .face {
      position: absolute;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .front{
      background-image: url('~@/assets/notebook/Desktop-notebook-cover.png');
    }
    .back {
      background-image: url('~@/assets/notebook/Desktop-notebook-cover-back.png');
    }
    .side.right {
      background: #a35630;
      height: 565px;
    }

    .top_corner, .bottom_corner {
      background: #472b16;
      height: 20px;
      width: 20px;
    }
    .top_corner {
      transform: rotateY(90deg) translateZ(565px) rotateX(24deg) translateY(39px) translateX(1px);
      &.a {
        transform: rotateY(90deg) translateZ(587px) translateY(82px) translateX(0px) rotateX(5deg);
        border-bottom: 10px solid #3b220f;
        box-sizing: border-box;
      }
      &.b {
        transform: rotateY(90deg) translateZ(587px) translateY(63px) translateX(0px) rotateX(5deg);
      }
      &.c{
        height: 9px;
        transform: rotateY(90deg) translateZ(587px) translateY(55px) translateX(0px) rotateX(5deg)
      }
      &.d {
        height: 9px;
        transform: rotateY(90deg) translateZ(584px) translateY(41px) translateX(0px) rotateX(208deg);
      }
      &.e {
        height: 9px;
        transform: rotateY(90deg) translateZ(589px) translateY(49px) translateX(0px) rotateX(181deg);
      }
    }
    .bottom_corner {
      &.a {
        transform: rotateY(90deg) translateZ(588px) translateY(681px) translateX(0px) rotateX(5deg);
      }
      &.b {
        transform: rotateY(90deg) translateZ(588px) translateY(662px) translateX(0px) rotateX(5deg);
      }
      &.c{
        height: 9px;
        transform: rotateY(90deg) translateZ(583px) translateY(706px) translateX(1px) rotateX(331deg);
      }
      &.d {
        height: 9px;
        transform: rotateY(90deg) translateZ(573px) translateY(712px) translateX(0px) rotateX(232deg);
      }
    }

    .side{
      height: 680px;
      border-radius: 5px;
      width: 21px;
      background-size: 100% 100%;
    }
    .cover{
      height: 738px;
      width: 600px;
      position: absolute;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .front  { transform: rotateY(  0deg) translateZ(10px);}
    .back   { transform: rotateY(180deg) translateZ(10px);}
    .left   { transform: rotateY(-90deg) translateZ(-8px) translateY(34px); background-color: #472b16; }
    .right  { transform: rotateY( 90deg) translateZ(586px) translateY(100px);}
  }

  .notebook{
    height: 738px;
    width: 600px;
    background-image: url('~@/assets/notebook/Desktop-notbook_Back.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    pointer-events: all;
    perspective: 2000px;
  }
  .active .tab{
    clip-path: none;
  }

  .pages{
    position: absolute;
    top: 3px;
    z-index: 10;
    bottom: 6px;
    left: -6px;
    right: 10px;
    background-image: url('~@/assets/notebook/Desktop-notbook_Pages.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
</style>
