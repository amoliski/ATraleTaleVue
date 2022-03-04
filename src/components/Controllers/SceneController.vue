<template>
  <div class="__scene_controller__">

  </div>
</template>

<script>

import {EventBus} from '@/event_bus.js';

  export default {
    name: "SceneController",
    watch: {
      '$store.getters.active.morale': {
        handler: 'setMoraleSprite',
        immediate: true
      },
      '$store.getters.active.fortitude': {
        handler: 'setWalkSprite',
        immediate: true
      },
      '$store.getters.active.scene': {
        immediate: true,
        handler(e, o){
          if(e && e!==o) {
            EventBus.$emit('unity_message', {
              method: 'changeScene',
              message: e,
            });
          }
        }
      },
    },
    data() {
      return {
        interval: null,
      }
    },
    methods: {
      scene_changed() {
        this.setMoraleSprite();
        this.setWalkSprite();
      },
      setWalkSprite() {
        const fortitude = this.$store.getters.active?.fortitude;
        const rainy = this.$store.getters.active.scene.toLowerCase().indexOf('rain') > -1;
        const set_outfit = (brother, outfit) => {
          EventBus.$emit('unity_message', {
            method: `Set${brother}Outfit`,
            message: outfit
          });
        }

        // Set Alex Outfit
        set_outfit("Alex", rainy ? "WalkRain" : "Walk");

        // Low fortitude
        if (fortitude < 25) {
          set_outfit("Andy", "LowFortitude")
        } else {
          if (rainy) {
            set_outfit("Andy", "WalkRain");
          } else {
            const walks = ["Walk", "Walk2"];
            const choice = Math.floor(Math.random() * 2);
            set_outfit("Andy", walks[choice])
          }
        }

      },
      setMoraleSprite() {
        const morale = this.$store.getters.active?.morale;
        const show_morale = (k, v) => {
          EventBus.$emit('unity_message', {
            method: `show${k}Morale`,
            message: v
          });
        }
        if (morale < 25) {
          show_morale('Low', 'TRUE')
          show_morale('High', 'FALSE')
        }
        else if (morale > 75) {
          show_morale('Low', 'FALSE')
          show_morale('High', 'TRUE')

        } else {
          show_morale('Low', 'FALSE')
          show_morale('High', 'FALSE')
        }
      },
    },



    beforeDestroy() {
      if(this.interval){
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    mounted() {
      window.messagePump.registerListener('scene_loaded', this.scene_changed);
    }
  }
</script>

<style lang="scss">
  .__scene_controller__ {

  }
</style>
