<template>
  <div class="__blurb_controller__">
    <div class="hotzone_container">
      <div class="hotzone" v-if="last_blurb" @click="hotzone_click"/>
    </div>
    <div class="blurb_container" style="user-select: none">
      <AvatarBox
          v-if="active_blurb"
          :content="blurb_text"
          :image="active_blurb.pages[blurb_page].image"
          class="av_box"
          style="pointer-events: all"
          @click="hotzone_click"
      />
    </div>
  </div>
</template>

<script>
import AvatarBox from '@/components/AvatarBox';
import {EventBus} from '@/event_bus.js';

  export default {
    name: "BlurbController",
    components: {AvatarBox},
    data() {
      return {
        active_blurb: null,
        last_blurb: null,
        blurb_page: 0,
      }
    },
    computed: {
      blurbs() {
          return this.$store.getters.active.blurbs.map(b => ({
            ...b,
            pages: JSON.parse(b.blurb_text),
          }));
      },
      blurb_text() {
        if (this.active_blurb) {
          return this.active_blurb.pages[this.blurb_page].text;
        }
        return '';
      }
    },
    methods: {
      hotzone_click() {
        if (!this.active_blurb){
          this.active_blurb = {...this.last_blurb};
          this.blurb_page = 0;
        } else {
          if (this.blurb_page + 1 >= this.active_blurb.pages.length){
            this.active_blurb = null;
            this.blurb_page = 0;
            return;
          } else {
            this.blurb_page++;
          }
        }
        this.active_blurb = this.last_blurb;
      }
    },
    destroyed() {
      clearInterval(this.interval);
    },
    mounted() {
      this.interval = setInterval(() => {
        const blurbs = this.blurbs;

        if(blurbs.length) {
          const selected_perk_index = Math.floor(Math.random() * blurbs.length);
          const selected_blurb = blurbs[selected_perk_index];

          this.last_blurb = selected_blurb;
          console.log(selected_blurb.perk);

          EventBus.$emit('unity_message', {
            method: 'SetBubbleSprite',
            message: selected_blurb.perk,
          })

          EventBus.$emit('unity_message', {
            method: 'ShowBubble',
            message: 'TRUE',
          })

          setTimeout(() => {
            EventBus.$emit('unity_message', {
              method: 'ShowBubble',
              message: 'FALSE',
            })
          }, 5*1000);
        }
      }, 20*1000);
    }
  }
</script>

<style lang="scss">
  .__blurb_controller__ {
    position: relative;

    .hotzone_container, .blurb_container{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: calc(100% - 110px);
      width: 100%;
      display: flex;

      @media screen and (min-width: 800px){
        height: 100%;
      }
    }
    .hotzone_container{
      align-items: center;
      justify-content: center;
    }


    .blurb_container{
      justify-content: center;
      align-items: flex-start;
      .av_box {
        margin-top: 150px;
        margin-left: 20px;
        z-index: 21;

        @media screen and (max-width: 800px) {
          .character img {
            height: 100px !important;
            width: 100px !important;
          }
          .__avatar_box__ .textField {
            width: calc(100vw - 100px - 100px);
          }
        }
      }
    }

    @media screen and (min-width: 800px){
      .blurb_container{
        justify-content: flex-start;
        align-items: flex-end;
        .av_box {
          margin-bottom: 150px;
          margin-left: 20px;
          z-index: 21;
        }
      }
    }

    .hotzone {
      height: 400px;
      width: 200px;
      cursor: pointer;
      background-color: transparent;
      z-index: 18;
      margin-bottom: -100px;
      opacity: 0.2;
      border-radius: 100px;
      // &:hover{
      //   background-color: white;
      //   opacity: 0.4;
      // }
    }
  }
</style>
