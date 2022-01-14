<template>
  <div class="__update__">
    <div>
      <border_box class="container" ref="container">
        <div v-if='!loading'>

          <div class="new">
            <h3>Update Status</h3>
            <div class="slidecontainer">
              <label for="fortitude">Fortitude</label>
              <input type="range" min="1" max="100" value="50" class="slider" v-model="new_fortitude" id="fortitude">
              <div class="val">{{new_fortitude}}</div>
            </div>
            <div class="slidecontainer">
              <label for="sanity">Sanity</label>
              <input type="range" min="1" max="100" value="50" class="slider" v-model="new_sanity" id="sanity">
              <div class="val">{{new_sanity}}</div>
            </div>
          </div>
          <h3>Scene</h3>
<!--          <div>-->
<!--            <select v-model="scene">-->
<!--              <option value="interstitials">Interstitials</option>-->
<!--              <option disabled>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</option>-->
<!--              <option value="hike_cades_cove">Cades Cove</option>-->
<!--              <option value="hike_green_tunnel">Green Tunnel</option>-->
<!--              <option value="hike_town">Town</option>-->
<!--              <option value="hike_highlands">Highlands</option>-->
<!--              <option disabled>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</option>-->
<!--              <option value="campsite_morning">Campsite Morning</option>-->
<!--              <option value="campsite_midnight">Campsite Midnight</option>-->
<!--              <option value="campsite_evening_rain">Campsite Evening Rain</option>-->
<!--              <option value="campsite_evening">Campsite Evening</option>-->
<!--            </select>-->
<!--          </div>-->

          <div class="perk_list">
            <button
                :class="{active: active_scene.indexOf(scene) > -1, perk_button:true}"
                :key='scene' v-for="scene in scene_list"  v-on:click="() => toggle_scene(scene)">
              <div :perk="scene">{scene}</div>
            </button>
            <button :class="{active: scene === 'hike_cades_cove'}" v-on:click="() => scene = 'hike_cades_cove'">
              <img style="height: 50px;" src="@/assets/update/cades.png"/><br/>
              Cade's Cove
            </button>
            <button :class="{active: scene === 'hike_green_tunnel'}" v-on:click="() => scene = 'hike_green_tunnel'">
              <img style="height: 50px;" src="@/assets/update/green_tunnel.png"/><br/>
              Green Tunnel
            </button>
            <button :class="{active: scene === 'hike_town'}" v-on:click="() => scene = 'hike_town'">
              <img style="height: 50px;" src="@/assets/update/town.png"/><br/>
              Town
            </button>
            <button :class="{active: scene === 'hike_highlands'}" v-on:click="() => scene = 'hike_highlands'">
              <img style="height: 50px;" src="@/assets/update/highlands.png"/><br/>
              Highlands
            </button>
          </div>
          <div class="perk_list">

            <button :class="{active: scene === 'campsite_morning'}" v-on:click="() => scene = 'campsite_morning'">
              <img style="height: 50px;" src="@/assets/update/campsite_morning.png"/><br/>
              Morning
            </button>
            <button :class="{active: scene === 'campsite_evening'}" v-on:click="() => scene = 'campsite_evening'">
              <img style="height: 50px;" src="@/assets/update/evening.png"/><br/>
              Evening
            </button>
            <button :class="{active: scene === 'campsite_evening_rain'}" v-on:click="() => scene = 'campsite_evening_rain'">
              <img style="height: 50px;" src="@/assets/update/campsite_evening_rain.png"/><br/>
              Evening Rain
            </button>
            <button :class="{active: scene === 'campsite_midnight'}" v-on:click="() => scene = 'campsite_midnight'">
              <img style="height: 50px;" src="@/assets/update/campsite_midnight.png"/><br/>
              Midnight
            </button>
          </div>

          <div style="display: flex; flex-direction: row; justify-content: center;">
            <div style="margin-right: 1em;">
              <h3>Location</h3>
              <input v-model="location">
            </div>
            <div style="margin-left: 1em;">
              <h3>Miles</h3>
              <input v-model="miles">
            </div>
          </div>

          <h3>Blurb</h3>
          <textarea v-model="blurb"/>

          <h3>Expression</h3>
          <div class="expression_list">
            <div v-for="image in image_list" :key="image">
              <button  v-on:click="() => (expression = image)"
                       :class="{active: expression === image, perk_button:true}">
                <AvatarBox
                    :size = '64'
                    :image="image" :border="false"
                    :image_bg_color="'transparent'"
                    :dialog_box="false" />
              </button>
            </div>

          </div>

          <h3>Perks</h3>
          <div class="perk_list">
            <button
                :class="{active: active_perks.indexOf(perk) > -1, perk_button:true}"
                :key='perk' v-for="perk in perk_list"  v-on:click="() => toggle_perk(perk)">
              <Perk :perk="perk" />
            </button>
          </div>
          <button class="save_button" v-on:click="active_perks = []">Clear All Perks</button>
          <button class="save_button" v-on:click="save_values">Save</button>
        </div>
        <div v-else>
          Loading...
        </div>
      </border_box>
    </div>
  </div>
</template>

<script>
import border_box from "../components/BorderBox";
import Perk from '../components/GUI/Perk'
import perks from '../components/GUI/perks'
import axios from 'axios';
import images from '../components/images.js'
import AvatarBox from "../components/AvatarBox";

export default {
  name: "Update.vue",
  components: {border_box, Perk, AvatarBox},
  data() {
    return {
      loading: true,
      new_fortitude: 0,
      new_sanity: 0,
      expression: '',
      active_perks: [],
      location: '',
      miles: 0,
      blurb: '',
      timestamp: 0,
      scene: '',
    }
  },
  mounted() {
    this.load();
  },
  computed: {
    perk_list() {
      return Object.keys(perks);
    },
    image_list() {
      return Object.keys(images);
    }
  },
  methods: {
    toggle_perk(perk) {
      if(this.active_perks.indexOf(perk) === -1){
        this.active_perks.push(perk);
      } else {
        this.active_perks.splice(this.active_perks.indexOf(perk), 1);
      }
    },
    async load() {
      this.loading = true;
      const r = await axios.get('https://switchbacks.us:5000/status');
      this.loading = false;
      this.new_fortitude = r.data.fortitude || 0;
      this.new_sanity = r.data.sanity || 0;
      this.active_perks =  r.data.perks.split(',') || [];
      this.expression = r.data.expression;
      this.location = r.data.location;
      this.blurb = r.data.blurb;
      this.timestamp = r.data.timestamp;
      this.miles = r.data.miles;
      this.scene = r.data.scene;
    },
    async save_values() {
      const cont = this.$refs.container.$el;
      cont.style.minHeight = cont.getBoundingClientRect().height+'px';

      this.loading = true;
      await axios.post('https://switchbacks.us:5000/status', {
        fortitude: this.new_fortitude,
        sanity: this.new_sanity,
        perks: this.active_perks.filter(e => !!e).join(','),
        expression: this.expression,
        blurb: this.blurb,
        location: this.location,
        timestamp: new Date().valueOf(),
        miles: this.miles,
        scene: this.scene,
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
.__update__ {
  background-color: #222;
  min-height: 100vh;
  padding: 30px;
  user-select: none;

  .perk_button {
    background-color: #5da3b0;
    border-radius: 3px;

    border: 2px solid #1b1c47;
    margin: 1px;
    > * {
      filter: grayscale(1);
      border-color: gray;
    }
  }
  .active {
    > * {
      filter: none;
      border-color: #ffffff;
    };
    border: 2px solid #a3ff8f;
    background-color: #6ec66e;
  }

  .perk_list, .expression_list {
    margin-top: 2em;
    overflow: auto;
    max-height: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    > *{
      cursor: pointer;
    }
  }
  .slidecontainer {
    display: flex;
    flex-direction: row;

  }
  label {
    width: 100px;
    text-align: start;
  }
  input {
    flex-grow: 1;
  }
  .new {
    width: 100%;
  }
  .container {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
  .val {
    width: 3em;
  }
  .save_button{
    cursor: pointer;
    border: 1px solid black;
    border-radius: 3px;
    margin: 2em;
    padding: 1em;
    font-family: 'Pexico'
  }
}
</style>
