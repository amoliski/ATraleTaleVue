import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
console.log(process.env)

Vue.config.productionTip = false
const config = {
  border_size: '12',
}

const store = new Vuex.Store({
  state: {
    fortitude: 0,
    sanity: 0,
    expression: null,
    perks: [],
    blurb: '',
    location: '',
    timestamp: 0,
    miles: '',
    scene: '',
  },
  mutations: {
    update(state, new_state) {
      state.fortitude = Number(new_state.fortitude);
      state.sanity = Number(new_state.sanity);
      state.perks = new_state.perks.split(',');
      state.expression = new_state.expression;
      state.blurb = new_state.blurb;
      state.location = new_state.location;
      state.timestamp = new_state.timestamp;
      state.miles = new_state.miles;
      state.scene = new_state.scene;
    }
  },
  actions: {
    async refresh(context) {
      const r = await axios.get('https://switchbacks.us:5000/status');
      context.commit('update', r.data);
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
    setInterval(() => this.$store.dispatch('refresh'), 10000);
  },
  render: h => h(App)
}).$mount('#app')
