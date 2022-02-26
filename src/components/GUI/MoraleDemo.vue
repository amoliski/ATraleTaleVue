<template>
  <div class="__morale_demo__" v-if="open" @click="bg_click">
    <div style="max-height: 100%; overflow-y: auto">
      <BorderBox style="margin: 0" class="menu">
      <button class="close_button" @click="$emit('close')">X</button>
      <h3 style="margin-top: .75em">Morale</h3>
      <p>Mental strength; Changes character & music</p>
      <div class="button_container">
        <div class="button_row">
          <BorderButton @click="morale='minus';" :active="morale==='minus'">
            -
          </BorderButton>
          <BorderButton @click="morale='neutral';" :active="morale==='neutral'">
            =
          </BorderButton>
          <BorderButton @click="morale='plus';" :active="morale==='plus'">
            +
          </BorderButton>
        </div>

      </div>
      <h3>Fortitude</h3>
      <p>Physical strength; Changes character</p>
      <div class="button_container">
        <div class="button_row">
          <BorderButton @click="fortitude='minus';" :active="fortitude==='minus'">
            -
          </BorderButton>
          <BorderButton @click="fortitude='plus';" :active="fortitude==='plus'">
            +
          </BorderButton>
        </div>
      </div>

      <h3>Attributes</h3>
      <p>Alterations to my disposition will be based on selected attributes to simulate the hardships and joys on the trail.</p>
      <div class="button_container">
        <div class="button_row">
          <div>
            <div><img style="width: 75px" :src="require('@/assets/perks/elevation.png')"/></div>
            <div style="white-space: nowrap">Rough Terrain</div>
            <div style="color: #df7e39">- fortitude</div>
          </div>
          <div>
            <div><img style="width: 75px" :src="require('@/assets/perks/buggy.png')"/></div>
            <div>Buggy</div>
            <div style="color: #df7e39">- morale</div>
          </div>
        </div>
      </div>

      <div class="dialog_bottom">
        <BorderButton @click="save"><span style="padding: 5px 40px">Save changes</span></BorderButton>
      </div>

      </BorderBox>
    </div>
  </div>
</template>


<script>
import BorderBox from '@/components/BorderBox';
import BorderButton from "../BorderButton";

export default {
  name: "MoraleDemo",
  components: {BorderButton, BorderBox},
  props: ['open'],
  data() {
    return {
      morale: 'plus',
      fortitude: 'plus',
    }
  },
  computed: {
    can_be_rainy() {
      return this.time === 'midday' || this.time === 'evening';

    },
    campsite() {
      return this.time === 'evening' || this.time === 'midnight';
    },
  },
  methods: {
    save() {
      let fortitude = 50;
      let morale = 50;
      if (this.morale === 'plus') {
        morale = 75 + Math.floor(Math.random() * 25);
      } else if (this.morale === 'neutral'){
        morale = 50 + Math.floor(Math.random() * 25);
      } else {
        morale = Math.floor(Math.random() * 30);
      }
      if (this.fortitude === 'plus') {
        fortitude = fortitude + 25 + Math.floor(Math.random() * 25)
      } else {
        fortitude = fortitude - 25 - Math.floor(Math.random() * 25)
      }
      this.$store.dispatch('change_mood', {morale, fortitude})
      this.$emit('close');
    },
    bg_click(e) {
      if(e.target.className === '__morale_demo__'){
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss">
.__morale_demo__ {
  user-select: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding-top: 10px;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog_bottom{
    margin: 1.5em -5px -5px -5px;;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color:#E7D7C5
  }

  .button_container {
    display: flex;
    flex-direction: column;
    .button_row{
      display: flex;
      flex-direction: row;
      justify-content: center;
      > *{
        margin-left: .25em;
        margin-right: .25em;
      }
      * {
        width: 100%;
        max-width: 100px;
      }
      .text{
        transform: translateY(-2px);
      }
    }
  }

  .menu {
    max-width: 600px;
    margin: 20px;
    width: 100%;
    position: relative;

    .close_button {
      position: absolute;
      top: -10px;
      color: #df7e39;
      transform: scaleX(1.2);
      right: 0;
      &:hover{
        color: #ef8b45;
      }
    }

    h3 {
      margin-bottom: 0;
      font-size: 1.5em;
      &:first-of-type{
        margin-top: 0;
      }
    }
    p {
      font-size: .9em;
      margin-top: .2em;
      margin-bottom: 1em;
    }
    button {
      font-family: 'Pexico';
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
}
</style>
