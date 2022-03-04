<template>
  <div class="__location_updater__">
    <div style="margin-top: 20px;">
      <h3>Current</h3>
      <GeoLocation/>
      <div class="input">
        <span>Miles:</span>
        <input/>
      </div>
      <div class="input">
        <span>Location:</span>
        <input/>
      </div>

      <h3>Projection</h3>
      <div class="input">
        <span>Miles:</span>
        <input/>
      </div>
      <div class="input">
        <span>Days:</span>
        <input/>
      </div>
      <div class="dialog_bottom">
        <BorderButton @click="save"><span style="padding: 5px 40px">Save changes</span></BorderButton>
      </div>

    </div>
  </div>
</template>

<script>
import BorderButton from "@/components/BorderButton";

  import GeoLocation from "../Components/GeoLocation";
  export default {
    name: "LocationUpdater",
    components: {GeoLocation, BorderButton},
    methods: {
      save() {
        console.log('saving');
      }
    }
  }
</script>

<style lang="scss">
  .__location_updater__ {
    .input {
      margin-top: 10px;

      span {
        display: inline-block;
        width: 100px;
        text-align: start;
      }
    }
  }
</style>
