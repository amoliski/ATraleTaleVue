<template>
  <div class="__debug_menu__" v-if="open">
    <BorderBox class="menu">
      <div class="container">
        <button v-on:click='$emit("close")' class="close_button">X</button>

        <div class="row" style="margin-top: 30px;">
          <div class="title">Scene</div>
          <div v-if="scenes.length > 0">
            <select name="andy_outfit" v-model="active_scene">
              <option v-for="scene in scenes" :key="scene">{{scene}}</option>
            </select>
          </div>
        </div>


        <div class="row">
          <div class="title">Andy</div>
          <div>
            <select name="andy_outfit" v-model="andy_outfit">
              <option value="Walk">Walk</option>
              <option value="Walk2">Walk2</option>
              <option value="WalkRain">WalkRain</option>
            </select>
          </div>
          <button @click="toggle_display('Andy','TRUE')">Show</button>
          <button @click="toggle_display('Andy','FALSE')">Hide</button>
        </div>

        <div class="row" v-if="this.active_scene && this.active_scene.indexOf('hike_') === 0">
          <div class="title">Alex</div>
          <div>
            <select name="alex_outfit" v-model="alex_outfit" :disabled="!private_active_scene">
              <option value="Walk">Walk</option>
              <option value="WalkRain">WalkRain</option>
            </select>
          </div>
          <button @click="toggle_display('Alex','TRUE')">Show</button>
          <button @click="toggle_display('Alex','FALSE')">Hide</button>
        </div>

        <div class="row" v-if="this.active_scene && this.active_scene.indexOf('hike_') === 0">
          <div class="title">Show Bubble</div>
          <div>
            <select name="alex_outfit" v-model="selected_bubble" :disabled="!private_active_scene">
              <option value="Walk">Walk</option>
              <option value="WalkRain">WalkRain</option>
            </select>
          </div>
          <button @click="toggle_display('Bubble','TRUE')">Show</button>
          <button @click="toggle_display('Bubble','FALSE')">Hide</button>
        </div>

        <div class="row" v-if='this.active_scene === "interstitials"'>
          <div class="title">Interstitials</div>
          <div>
            <select name="interstitials" v-model="active_interstitial" :disabled="!private_active_scene">
              <option
                  v-for="inter in interstitial_options"
                  :key="inter"
                  :value="inter">
                {{inter}}
              </option>
            </select>
          </div>
        </div>
      </div>
    </BorderBox>
  </div>
</template>

<script>
import {EventBus} from '@/event_bus.js';
import BorderBox from '@/components/BorderBox';
export default {
  name: "DebugMenu",
  components: {
    BorderBox,
  },
  props: ['open'],
  data() {
    return {
      private_alex_outfit: 'Walk',
      private_andy_outfit: 'Walk',
      private_active_scene: null,
      scenes: [""],
      interstitial_options: [],
      private_active_interstitial: null,
    };
  },
  mounted() {
    window.messagePump.registerListener('scene_loaded', (e) => {
      this.private_active_scene = JSON.parse(e);
      EventBus.$emit('unity_message', {
        method: 'getScenes',
        message: '',
      })
    });
    window.messagePump.registerListener('interstitial_list', (e) => {
      const options =  JSON.parse(e);
      this.interstitial_options = options;
      EventBus.$emit('unity_message', {
        method: 'showInterstitial',
        message: options[0] || '',
      })
    });
    window.messagePump.registerListener('scene_list', (e)=> {
      this.scenes = JSON.parse(e);
    })
  },
  methods: {
    change_interstitial(name){
      EventBus.$emit('unity_message', {
        method: `showInterstitial`,
        message: name,
      })
    },
    // eslint-disable-next-line no-unused-vars
    toggle_display(brother, val) {
      EventBus.$emit('unity_message', {
        method: `Show${brother}`,
        message: val,
      })
    },
    // eslint-disable-next-line no-unused-vars
    change_scene(id) {
      if (!id || id === this.private_active_scene) {
        console.log('ignoring invalid scene change', id, this.private_active_scene);
        return;
      }
      EventBus.$emit('unity_message', {
        method: 'changeScene',
        message: id,
      })
    },
  },
  computed: {
    active_interstitial: {
      get() {
        return this.private_active_interstitial;
      },
      set(e) {
        this.change_interstitial(e);
      },
    },
    active_scene: {
      get() {
        return this.private_active_scene
      },
      set(e) {
        this.change_scene(e);
      },
    },
    andy_outfit: {
      get() {return this.private_andy_outfit},
      set(e) {
        this.private_andy_outfit = e;
        EventBus.$emit('unity_message', {
          method: 'SetAndyOutfit',
          message: e,
        })
      }
    },
    alex_outfit: {
      get() {return this.private_alex_outfit},
      set(e) {
        this.private_alex_outfit = e
        EventBus.$emit('unity_message', {
          method: 'SetAlexOutfit',
          message: e,
        })
      }
    }
  }
}
</script>

<style lang="scss">
.__debug_menu__ {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  pointer-events: none;
  .menu{
    pointer-events: all;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 20px;
    height: 200px;
    width: 500px;


    select{
      margin: 5px;
      padding: 3px;
      background-color: #fff1e0;
      font-family: 'Pexico'
    }

    button{
      border: 1px solid black;
      border-radius: 3px;
      padding: 3px;
      margin: 5px;
      font-family: 'Pexico'
    }

    .title{
      width: 60px;
      margin: 5px;
    }

    .container{
      position:relative;
      height: 100%;
      width: 100%;
    }

    .row {
      display: flex;
      flex-direction: row;
      padding: 0;
    }
    .close_button{
      position: absolute;
      padding: 5px;
      top: 0;
      right: 0;
    }
  }
}
</style>
