<template>
  <div class="__update__">
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
import JournalUpdater from '@/components/Update/Pages/JournalUpdater'
import LocationUpdater from '@/components/Update/Pages/LocationUpdater'
import MoodUpdater from '@/components/Update/Pages/MoodUpdater'
import SceneUpdater from '@/components/Update/Pages/SceneUpdater'
import PerkUpdater from '@/components/Update/Pages/PerkUpdater'
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
  name: "Update",
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
.__update__ {
  display: flex;
  justify-content: center;


  .dialog_bottom{
    margin: 1.5em -5px -5px -5px;;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color:#E7D7C5
  }
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .__border_button__ {
      font-size: 2em;
    }
    .__border_button__:not(:first-of-type) {
      margin-left: -10px;
    }
  }
  .container {
    width: 100%;
    max-width: 800px;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    .scroll {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

}
.__updatex__ {
  background-color: #222;
  min-height: 100vh;
  padding: 30px;
  user-select: none;



  .perk_list, .expression_list {
    margin-top: 2em;
    overflow: auto;
    max-height: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
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
