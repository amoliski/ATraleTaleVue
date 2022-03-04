<template>
  <div class="__scene_update__">
    <div v-if="loading">
      Loading
    </div>
    <div v-if="!loading">
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
          <BorderButton @click="location='mountain'" :active="location==='mountain'" :disabled="campsite">
            Mountain
          </BorderButton>
          <BorderButton @click="location='valley'" :active="location==='valley'" :disabled="campsite">
            Valley
          </BorderButton>
        </div>
        <div class="button_row" style="margin-top: -5px">
          <BorderButton @click="location='forest'" :active="location==='forest'" :disabled="campsite">
            Forest
          </BorderButton>
          <BorderButton @click="location='town'" :active="location==='town'" :disabled="campsite">
            Town
          </BorderButton>
        </div>
        <div class="button_row" style="margin-top: -5px">
          <BorderButton @click="location='zero'" :active="location==='zero'" :disabled="campsite">
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
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox';
import BorderButton from "@/components/BorderButton";
import axios from "axios";

  export default {
    name: "SceneUpdate",
    components: {BorderButton, BorderBox},
    data() {
      return {
        loading: true,
        location: null,
        weather: null,
        time: null,
      }
    },
    computed: {
      can_be_rainy() {
        return this.time === 'midday' || this.time === 'evening' || (this.location === 'zero' && (this.time === 'morning' || this.time === 'midday'));
      },
      campsite() {
        return this.time === 'evening' || this.time === 'midnight';
      },
    },
    mounted() {
      this.load();
    },
    methods: {
      async load() {
        this.loading = true;
        const r = await axios.get('https://switchbacks.us:5000/scene');

        this.weather =  r.data.weather;
        this.time = r.data.time;
        this.location = r.data.location;

        this.loading = false;
      },
      async save() {
        this.loading = true;
        await axios.post('https://switchbacks.us:5000/scene', {
          location: this.location,
          weather: this.weather,
          time: this.time,
        });
        await new Promise(resolve => {
          setTimeout(() => resolve(), 1000);
        })
        await this.load();
      }
    }
  }
</script>

<style lang="scss">
  .__scene_update__ {

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
      font-weight: bold;
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
  }
</style>
