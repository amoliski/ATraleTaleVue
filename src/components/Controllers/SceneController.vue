<template>
  <div class="__scene_controller__">

  </div>
</template>

<script>
const perk_map = {
  bored:'bored',
  bubble:'bubble',
  buggy:'buggy',
  craving:'craving',
  crowds:'crowds',
  damaged_gear:'damaged_gear',
  determined:'determined',
  dirty:'dirty',
  elevation:'elevation',
  encumbered:'encumbered',
  entertained:'entertained',
  existential:'existential',
  fatigue:'fatigue',
  freezing:'freezing',
  good_company:'good_company',
  homesick:'homesick',
  hot:'hot',
  inclement_weather:'inclement_weather',
  injured:'injured',
  inspired:'inspired',
  light_on_my_feet:'light_on_my_feet',
  lonely:'lonely',
  lovely_weather:'lovely_weather',
  new_gear:'new_gear',
  notebook:'notebook',
  parched:'parched',
  picturesque:'picturesque',
  rough_trail:'rough_trail',
  sick:'sick',
  soaked:'soaked',
  sore:'sore',
  well_rested:'well_rested',
  wildlife:'wildlife'
}

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
      this.interval = setInterval(() => {
        const perk_list = this.$store.getters.active.perks;

        if(perk_list.length) {
          const selected_perk_index = Math.floor(Math.random() * perk_list.length);
          const selected_perk_key = perk_list[selected_perk_index];
          const selected_perk = perk_map[selected_perk_key];
          console.log({perk_map, selected_perk, selected_perk_index, perk_list, selected_perk_key})

          EventBus.$emit('unity_message', {
            method: 'SetBubbleSprite',
            message: selected_perk,
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
  .__scene_controller__ {

  }
</style>
