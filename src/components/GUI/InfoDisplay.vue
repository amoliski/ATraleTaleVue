<template>
  <div class="__info_display__" v-if="open" @click="bg_click">
    <div style="max-height: 100%; overflow: auto">
      <BorderBox style="margin: 1em" class="menu">

        <h1 class="title">A Trail Tale</h1>
        <h2 class="subtitle">Welcome to A Trail Tale!</h2>
        <p>
          This website is intended to be a teaser prototype for an upcoming
          interactive blog which will let you tag along with me when I hike
          the Appalachian Trail, a 2200 mile trail stretching from Georgia
          to Maine.
        </p>


        <BorderButton :shadow='true' @click="$emit('close')">
            <div class="button_text">
              Got It!
            </div>
        </BorderButton>



      </BorderBox>
    </div>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox';
import BorderButton from "../BorderButton";

export default {
  name: "InfoDisplay",
  components: {BorderBox, BorderButton},
  props: ['open'],
  methods: {
    bg_click(e) {
      if(e.target.className === '__info_display__'){
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss">
.__info_display__ {
  position: absolute;
  pointer-events: all;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal_content {
    margin: auto;
    max-height: 100%;
    overflow: auto;
  }
  .title {
    white-space: nowrap;

  }
  .subtitle {
    white-space: nowrap;

  }
  .menu{
    dispaly: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    margin: 20px;
    p {
      font-size: 1.3em;
    }
    button {
      font-family: 'Pexico';
      width: 300px;
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 1.5em;
    }
  }
}
</style>
