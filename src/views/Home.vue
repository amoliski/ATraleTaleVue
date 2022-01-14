
<template>
  <div class="app">
    <Loading_Screen v-if="loading"/>
    <Unity style="z-index:1"/>
    <Main_GUI class="desktop" style="z-index:4"></Main_GUI>
    <Mobile_GUI class="mobile" style="z-index:4"></Mobile_GUI>
  </div>
</template>

<script>
// @ is an alias to /src
import Unity from '@/components/Unity.vue'
import Main_GUI from '@/components/GUI/Main_GUI.vue'
import Mobile_GUI from '@/components/GUI/Mobile_GUI.vue'
import Loading_Screen from '@/components/GUI/LoadingScreen/Loading_Screen.vue'

export default {
  name: 'Home',
  components: {
    Unity,
    Main_GUI,
    Mobile_GUI,
    Loading_Screen
  },
  mounted() {
    window.messagePump.registerListener(
        'unity_loaded',() => {setTimeout(() => this.loading = false, 1500);}
    );
  },
  data() {
    return {
      loading: true,
    }
  }
}
</script>

<style lang="scss">
.app{
  .mobile{
    display: block;
  }
  .desktop {
    display: none;
  }
  @media screen and (min-width: 500px){
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
  height: 100vh;
  width: 100%;
  background-color: black;
  > div {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
