import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

Vue.config.productionTip = false
const config = {
  border_size: '16',
}

const store = new Vuex.Store({
  state: {
    mode: 'live',
    live: {
      fortitude: 0,
      morale: 0,
      expression: null,
      perks: [],
      blurb: '',
      location: '',
      timestamp: 0,
      miles: '',
      scene: '',
    },
    demo:{
      fortitude:77,
      morale:83,
      expression:"Neutral_2",
      perks:["exceptional_wildlife", "picturesque", "well_rested", "inspired"],
      blurb:"I'm finally getting my hiker-legs. About Time! ",
      location:"Pennsylvania",
      timestamp:"1644363203741",
      miles:"1234",
      scene: "hike_cades_cove"
    }

  },
  getters: {
    active(state) {
      return state[state.mode];
    },
  },
  mutations: {
    update_live(state, new_state) {
      state.live.fortitude = Number(new_state.fortitude);
      state.live.morale = Number(new_state.sanity);
      state.live.perks = new_state.perks.split(',');
      state.live.expression = new_state.expression;
      state.live.blurb = new_state.blurb;
      state.live.location = new_state.location;
      state.live.timestamp = new_state.timestamp;
      state.live.miles = new_state.miles;
      state.live.scene = new_state.scene;
    },
    set_mode(state, mode) {
      state.mode = mode;
    },
    set_demo_scene(state, scene) {
      state.demo.scene = scene;
    },
    set_demo_mood(state, {morale, fortitude}){
      state.demo.fortitude = fortitude;
      state.demo.morale = morale;
    }
  },
  actions: {
    change_scene(context, scene){
      console.log('changing the scene to', scene)
      context.commit('set_demo_scene', scene);
    },
    change_mood(context, mood) {
      context.commit('set_demo_mood', mood);
    },
    setMode(context, mode) {
      context.commit('set_mode', mode);
    },
    async refresh(context) {
      const r = await axios.get('https://switchbacks.us:5000/status');
      context.commit('update_live', r.data);
    }
  }
})

new Vue({
  router,
  store,
  data(){
    return config;
  },
  mounted() {
    this.$store.dispatch('setMode', this.$route.query.mode === 'live' ? 'live' : 'demo');
    setInterval(() => this.$store.dispatch('refresh'), 10*1000);
  },
  render: h => h(App)
}).$mount('#app')
