<template>
  <div class="__geo_location__">
    <div v-if="errorStr">
      Sorry, but the following error
      occurred: {{errorStr}}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="location">
      Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
    </div>

  </div>
</template>

<script>
export default {
  name: "GeoLocation",
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null
    }
  },
  mounted() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  }
}
</script>

<style lang="scss">
.__geo_location__ {

}
</style>
