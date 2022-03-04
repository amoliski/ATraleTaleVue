
<template>
  <div class="app">
    <SceneController />
    <Loading_Screen
        v-if="loading"
        @ready="ready" :ready="is_ready"
        :enable_audio="enable_audio" @toggle_audio="toggle_audio"
    />
    <AudioController :loading="loading" :audio_enabled="enable_audio"/>
    <BlurbController/>
    <Main_GUI class="desktop" @toggle_audio="toggle_audio" style="z-index:50"></Main_GUI>
    <Mobile_GUI class="mobile" @toggle_audio="toggle_audio" style="z-index:50"></Mobile_GUI>
    <Unity style="z-index:1"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Unity from '@/components/Unity.vue'
import Main_GUI from '@/components/GUI/Main_GUI.vue'
import Mobile_GUI from '@/components/GUI/Mobile_GUI.vue'
import Loading_Screen from '@/components/GUI/LoadingScreen/Loading_Screen.vue'
import SceneController from '@/components/Controllers/SceneController.vue'
import AudioController from '@/components/Controllers/AudioController.vue'
import BlurbController from '@/components/Controllers/BlurbController.vue'

export default {
  name: 'Home',
  components: {
    Unity,
    Main_GUI,
    Mobile_GUI,
    Loading_Screen,
    SceneController,
    AudioController,
    BlurbController
  },
  mounted() {
    window.messagePump.registerListener(
     'unity_loaded',() => {
          setTimeout(() => this.is_ready = true, 1500);
     }
    );
  },
  methods: {
    ready(){
      this.loading = false;
    },
    toggle_audio() {
      this.enable_audio = !this.enable_audio;
    }
  },
  data() {
    return {
      loading: true,
      is_ready: false,
      enable_audio: true,
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
  @media screen and (min-width: 800px){
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
  height: 100%;
  width: 100%;
  background-color: black;
  > div {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
