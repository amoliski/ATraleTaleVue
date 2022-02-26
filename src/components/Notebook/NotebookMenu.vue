<template>
  <div class="__menu__" :class="{open}">
    <div class="scene" :style="notebook_translation">
      <div class="notebook" :style="{'transform':`scale(${this.scale_factor})`}">
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

        <!--div class="page_fold"></div-->

        <div class="notebook_pages">
          <NotebookTabs class='tabs' :active_tab="active_tab" @change_tab="active_tab = $event"/>
          <div class="pages">
            <component :is="active_page"></component>
          </div>
        </div>

        <div class="back_cover"></div>
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
      opened: false,
      scale_factor: 1,
      notebook_translation: ''
    }
  },
  watch: {
    open(n) {
      if (n === true){
        // Slide book up
        // Open cover
      } else {
        // close cover
        // slide book down
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.screen_resized);
    this.screen_resized();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screen_resized);
  },
  methods: {
    screen_resized() {
      const nb_width = 550;
      const nb_height = 750;
      const padding = 0;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let scale = screenWidth/(nb_width+padding);
      if (((nb_height + padding) * scale) > screenHeight) {
        scale = screenHeight/(nb_height+padding);
      }
      this.scale_factor = scale;

      const bw = ((screenWidth - (nb_width)) / 2);
      const sh = ((screenHeight - (nb_height)) / 2);
      this.notebook_translation =  {transform: `translateX(${bw}px) translateY(${sh}px)`};

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

@keyframes fold {
  0% {
    transform: translateY(46px) translateZ(43px) translateX(-50px);
  }
  30%{
    transform: translateY(46px) translateZ(43px) translateX(-27px);
  }
  100% {
    transform: translateY(46px) translateZ(43px) translateX(-27px);
  }
}



.__menu__ {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
  transform: translateY(100vh);
  transition: transform 1s ease;
  .front_cover {
    transform: rotateY(0deg) translateZ(13px) translateY(5px) translateX(-33px);
    transition-delay: 0s;
    z-index: 500;
    transition: transform 1s ease;
    transform-origin: -10px;
  }
  &.open {
    transform: translateY(0);
    .front_cover{
      transition-delay: .5s;
      transform: rotateY(-351deg) translateZ(-56px) translateY(7px) translateX(-33px);
      z-index: 0;
    }
    .page_fold {
      animation-name: fold;
      animation-duration: 4s;
      // animation-direction: alternate;
      // animation-iteration-count: infinite;
      animation-direction: reverse;
      animation-iteration-count: 1;
      transform-origin:left;
      animation-fill-mode: both;
    }
  }
  * {
    transform-style: preserve-3d;
  }

  .scene {
    z-index: 1000;
    position: absolute;
    width: 200px;
    height: 200px;
    perspective: 2860px;
    pointer-events: all;

    .notebook {
      transform-style: preserve-3d;
      position: relative;

      .front_cover, .back_cover, .notebook_pages, .page_fold {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

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
        transform: translateZ(1px);

        .tabs {
          transform: translateZ(10px);
        }

        .pages{
          position: absolute;
          z-index: 10;
          bottom: 53px;
          left: 45px;
          right: 40px;
          top: 40px;
          background-size: 100%;
          background-repeat: no-repeat;
          transform: translateZ(5px);
        }
      }
      .page_fold {
        background-image: url('~@/assets/notebook/page_edges.png');
        height: 738px;
        width: 60px;
        background-repeat: no-repeat;
        background-size: 100%;
        transform-origin:left;
      }
      .back_cover {
        height: 738px;
        width: 600px;
        background-image: url('~@/assets/notebook/Desktop-notebook_Back.png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
        transform: translateZ(-10px) translateY(10px);
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
          transform: rotateY(90deg) translateZ(588px) translateY(662px) translateX(0px) rotateX(0deg);
          height: 45px;
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
  }
}
</style>
