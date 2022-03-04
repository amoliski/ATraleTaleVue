<template>
  <div class="__mood_updater__">
    <div class="new">
      <div v-if="loading" class="loading" :style="{minHeight: minHeight}" >
        Loading...
      </div>
      <div v-if="!loading" ref="container">
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
        <div class="dialog_bottom">
          <BorderButton @click="save"><span style="padding: 5px 40px">Save changes</span></BorderButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BorderButton from "@/components/BorderButton";

export default {
  name: "MoodUpdater",
  components: {BorderButton},
  data() {
    return {
      loading: true,
      new_fortitude: 0,
      new_sanity: 0,
      minHeight: '200px',
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      const r = await axios.get('https://switchbacks.us:5000/status');
      this.new_fortitude = r.data.fortitude || 0;
      this.new_sanity = r.data.sanity || 0;
      this.loading = false;
    },
    async save() {
      const cont = this.$refs.container;
      this.minHeight = cont.getBoundingClientRect().height+'px';
      console.log(this.$refs.container);
      this.loading = true;
      await axios.post('https://switchbacks.us:5000/status', {
        fortitude: this.new_fortitude,
        sanity: this.new_sanity,
      });
      await new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      })
      await this.load();
    }
  },
}
</script>

<style lang="scss">
.__mood_updater__ {
  .loading {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
