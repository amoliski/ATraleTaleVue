<template>
  <div class="__notebook_tabs__">
    <button
        v-for="tab in tabs" :key="tab.id"
        class="button_tab"
        @click="$emit('change_tab', tab.id)" :class="{active: active_tab === tab.id}">
      <div class="tab" :class="tab.class">
        {{tab.title}}
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "NotebookTabs",
  props: ['active_tab'],
  computed: {
    tabs() {
      return [
        {title: 'Map', id: 1, class:'tab-1'},
        {title: 'Status', id: 2, class:'tab-2'},
        {title: 'Journal', id: 3, class:'tab-3'},
        {title: 'Log', id: 4, class:'tab-4'},
        {title: 'About', id: 5, class:'tab-5'},
      ]
    }
  }
}
</script>

<style lang="scss">
.__notebook_tabs__ {
  position: absolute;
  top: 20px;
  left: 40px;
  right: 50px;
  z-index:30;
  height: 60px;
  display: flex;
  flex-direction: row;

  .button_tab{
    padding: 0;
    margin: 0 3px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }
  .tab{
    max-width: 100px;
    background-size: 100% 100%;
    height: 100%;
    padding-top: 5px;
    box-sizing: border-box;
    width: 100%;
    font-family: 'Pexico';
    clip-path: inset(0px 0px 20px 0px);
  }

  .tab-1{ background-image: url('~@/assets/notebook/Tab-Map.png'); }
  .tab-2{ background-image: url('~@/assets/notebook/Tab-Status.png'); }
  .tab-3{ background-image: url('~@/assets/notebook/Tab-Journal.png'); }
  .tab-4{ background-image: url('~@/assets/notebook/Tab-Log.png'); }
  .tab-5{ background-image: url('~@/assets/notebook/Tab-About.png'); }
  .tab-6{ background-image: url('~@/assets/notebook/Tab-X.png'); }

}
</style>
