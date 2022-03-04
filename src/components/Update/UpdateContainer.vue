<template>
  <div class="__update_container__">
    <BorderBox class="container">
      <div class="scroll">
        <div class="tabs">
          <BorderButton :active="tab==='scene'" @click="tab='scene'">Scene</BorderButton>
          <BorderButton :active="tab==='mood'" @click="tab='mood'">Mood</BorderButton>
          <BorderButton :active="tab==='journal'" @click="tab='journal'">Journal</BorderButton>
          <BorderButton :active="tab==='perks'" @click="tab='perks'">Perks</BorderButton>
          <BorderButton :active="tab==='location'" @click="tab='location'">Location</BorderButton>
        </div>
        <component :is="active_tab"/>
      </div>
    </BorderBox>
  </div>
</template>

<script>
  import JournalUpdater from './Pages/JournalUpdater'
  import LocationUpdater from './Pages/LocationUpdater'
  import MoodUpdater from './Pages/MoodUpdater'
  import SceneUpdater from './Pages/SceneUpdater'
  import PerkUpdater from './Pages/PerkUpdater'
  import BorderBox from '@/components/BorderBox';
  import BorderButton from "@/components/BorderButton";



  const tabs = {
    scene: SceneUpdater,
    mood: MoodUpdater,
    journal: JournalUpdater,
    perks: PerkUpdater,
    location: LocationUpdater,
  };

  export default {
    name: "UpdateContainer",
    components: {BorderBox, BorderButton},
    data() {
      return {
        tab: 'scene',
      }
    },
    computed: {
      active_tab() {
        return tabs[this.tab];
      }
    }
  }
</script>

<style lang="scss">
  .__update_container__ {
    display: flex;
    justify-content: center;
    .__border_button__ {
      font-size: 2em;
    }
    .__border_button__:not(:first-of-type) {
      margin-left: -10px;
    }
    .container {
      width: 100%;
      max-width: 800px;
      max-height: calc(100vh - 60px);
      overflow-y: auto;
    }
    .tabs {
      display: flex;
      flex-direction: row;
    }

  }
</style>
