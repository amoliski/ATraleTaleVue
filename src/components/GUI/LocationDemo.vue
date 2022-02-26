<template>
  <div class="__location_demo__" v-if="open" @click="bg_click">
    <div style="max-height: 100%; overflow-y: auto">
      <BorderBox style="margin: 0" class="menu">
      <button class="close_button" @click="$emit('close')">X</button>
      <h3 style="margin-top: .75em">Time of day</h3>
      <p>Scene & music to auto-update hourly</p>
      <div class="button_container">
        <div class="button_row">
          <BorderButton @click="time='morning'; weather='clear'" :active="time==='morning'">
            Morning
          </BorderButton>
          <BorderButton @click="time='midday';" :active="time==='midday'">
            Mid-day
          </BorderButton>
        </div>
        <div class="button_row" style="margin-top: -5px">
          <BorderButton @click="time='evening';" :active="time==='evening'">
            Evening
          </BorderButton>
          <BorderButton @click="time='midnight';" :active="time==='midnight'">
            Midnight
          </BorderButton>
        </div>
      </div>
      <h3>Location</h3>
      <p>Scene changes by state</p>
      <div class="button_container">
        <div class="button_row">
          <BorderButton @click="scene='mountain'" :active="scene==='mountain'" :disabled="campsite">
            Mountain
          </BorderButton>
          <BorderButton @click="scene='valley'" :active="scene==='valley'" :disabled="campsite">
            Valley
          </BorderButton>
        </div>
        <div class="button_row" style="margin-top: -5px">
          <BorderButton @click="scene='forest'" :active="scene==='forest'" :disabled="campsite">
            Forest
          </BorderButton>
          <BorderButton @click="scene='town'" :active="scene==='town'" :disabled="campsite">
            Town
          </BorderButton>
        </div>
        <div class="button_row" style="margin-top: -5px">
          <BorderButton @click="scene='zero'" :active="scene==='zero'" :disabled="campsite">
            Zero Day
          </BorderButton>
        </div>
      </div>

      <h3>Weather</h3>
      <p>Scene auto-updated by forecast</p>
      <div class="button_container">
        <div class="button_row">
          <BorderButton
              @click="weather='clear'"
              :active="!can_be_rainy || weather === 'clear'">
            Clear
          </BorderButton>
          <BorderButton
              @click="weather='rainy'"
              :disabled="!can_be_rainy"
              :active="can_be_rainy && weather === 'rainy'">
            Rainy
          </BorderButton>
        </div>
      </div>

      <div class="dialog_bottom">
        <BorderButton @click="save"><span style="padding: 5px 40px">Save changes</span></BorderButton>
      </div>

      </BorderBox>
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox';
import BorderButton from "../BorderButton";

export default {
  name: "LocationDemo",
  components: {BorderButton, BorderBox},
  props: ['open'],
  data() {
    return {
      scene: 'mountain',
      weather: 'clear',
      time: 'midday',
    }
  },
  computed: {
    can_be_rainy() {
      return this.time === 'midday' || this.time === 'evening' || (this.scene === 'zero' && (this.time === 'morning' || this.time === 'midday'));
    },
    campsite() {
      return this.time === 'evening' || this.time === 'midnight';
    },
  },
  methods: {
    save() {
      switch(this.time) {
        case "morning":
          switch(this.scene){
            case 'mountain':
              this.$store.dispatch('change_scene', 'hike_highlands__dawn_dusk');
              break;
            case 'valley':
              this.$store.dispatch('change_scene', 'hike_cades_cove__dawn_dusk');
              break;
            case 'forest':
              this.$store.dispatch('change_scene', 'hike_green_tunnel__dawn_dusk');
              break;
            case 'town':
              this.$store.dispatch('change_scene', 'hike_town__dawn_dusk');
              break;
            case 'zero':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'zero_day');
              } else {
                this.$store.dispatch('change_scene', 'zero_day__rainy');
              }
              break;
          }
          break;
        case "midday":
          switch(this.scene){
            case 'mountain':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'hike_highlands');
              } else {
                this.$store.dispatch('change_scene', 'hike_highlands__rainy');
              }
              break;
            case 'valley':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'hike_cades_cove');
                break;
              } else {
                this.$store.dispatch('change_scene', 'hike_cades_cove__rainy');
                break;
              }
            case 'forest':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'hike_green_tunnel');
              } else {
                this.$store.dispatch('change_scene', 'hike_green_tunnel__rainy');
              }
              break
            case 'town':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'hike_town');
                break;
              } else {
                this.$store.dispatch('change_scene', 'hike_town_rainy');
                break;
              }
            case 'zero':
              if (this.weather === 'clear') {
                this.$store.dispatch('change_scene', 'zero_day');
              } else {
                this.$store.dispatch('change_scene', 'zero_day__rainy');
              }
              break;
          }
          break;
        case "evening":
          if (this.weather === 'clear') {
            this.$store.dispatch('change_scene', 'campsite_evening');
            break;
          } else {
            this.$store.dispatch('change_scene', 'campsite_evening__rainy');
            break;
          }
        case "midnight":
          this.$store.dispatch('change_scene', 'campsite_midnight');
          break;
      }
      this.$emit('close');
    },
    bg_click(e) {
      if(e.target.className === '__location_demo__'){
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss">
.__location_demo__ {
  user-select: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding-top: 10px;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog_bottom{
    margin: 1.5em -5px -5px -5px;;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color:#E7D7C5
  }

  .button_container {
    display: flex;
    flex-direction: column;
    .button_row{
      display: flex;
      flex-direction: row;
      justify-content: center;
      > *{
        margin-left: .25em;
        margin-right: .25em;
      }
      * {
        width: 100%;
        max-width: 175px;
      }
    }
  }

  .menu {
    max-width: 600px;
    margin: 20px;
    width: 100%;
    position: relative;

    .close_button {
      position: absolute;
      top: -10px;
      color: #df7e39;
      transform: scaleX(1.2);
      right: 0;
      &:hover{
        color: #ef8b45;
      }
    }

    h3 {
      margin-bottom: 0;
      font-size: 1.5em;
      &:first-of-type{
        margin-top: 0;
      }
    }
    p {
      font-size: .9em;
      margin-top: .2em;
      margin-bottom: 1em;
    }
    button {
      font-family: 'Pexico';
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
}
</style>
