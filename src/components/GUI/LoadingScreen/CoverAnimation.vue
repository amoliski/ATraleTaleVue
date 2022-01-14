<template>
  <div class="__cover_animation__">
    <div class="circle">
      <div class='layer layer_4'/>
      <div class='layer layer_3'/>
      <div class='layer layer_2'/>
      <div class='layer layer_1'/>
    </div>
    <div class="andy"></div>
  </div>
</template>

<script>
export default {
  name: "CoverAnimation",
}
</script>

<style lang="scss">
@-webkit-keyframes loop_layer_1 {
  from{
    background-position-x: 1901.8px;
  }
  to{
    background-position-x: 0px;
  }
}
@-webkit-keyframes loop_layer_2 {
  from{
    background-position-x: 1446.4px;
  }
  to{
    background-position-x: 0px;
  }
}
@-webkit-keyframes loop_layer_3 {
  from{
    background-position-x: 1357.1px;
  }
  to{
    background-position-x: 0px;
  }
}
@-webkit-keyframes loop_layer_4 {
  from{
    background-position-x: 857.1px;
  }
  to{
    background-position-x: 0px;
  }
}
@-webkit-keyframes andy_walk {
  from{
    background-position-x: 0px;
  }
  to{
    background-position-x: -6104.65px;
  }
}

.__cover_animation__ {
  position: relative;
  width: 500px;
  height: 500px;

  .andy {
    height: 700px;
    width: 610px;
    margin-left: -55px;
    background-size: auto 500px;
    background-image: url('~@/assets/loader/walk_sprites.png');
    background-repeat: no-repeat;
    animation-iteration-count: infinite;
    animation-timing-function: steps(10);
    animation-duration: 1s;
    animation-name: andy_walk;
    background-position: center;
    background-origin: left;
    z-index: 300;
  }
  .circle {
    z-index: -1;
    height: 500px;
    width: 500px;
    position: absolute;
    top: 0;
    left: 0;
    mask-size: 500px 500px;
    mask-image: url('~@/assets/loader/0_mask.png');
  }

  .layer {
    width: 500px;
    height: 500px;
    animation-timing-function:linear;
    animation-iteration-count: infinite;
    background-repeat: repeat-x;
    background-size:cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  .layer_1{
    background-size: auto 500px;
    animation-timing-function: steps(100);
    animation-duration: 20s;
    animation-name: loop_layer_1;
    background-image: url('~@/assets/loader/1_trail.png');
  }
  .layer_2{
    background-size: auto 500px;
    animation-duration: 30s;
    animation-timing-function: steps(100);
    animation-name: loop_layer_2;
    background-image: url('~@/assets/loader/2_forest.png');
  }
  .layer_3{
    background-size: auto 500px;
    animation-duration: 50s;
    animation-timing-function: steps(100);
    animation-name: loop_layer_3;
    background-image: url('~@/assets/loader/3_mountain.png');
  }
  .layer_4{
    background-size: auto 500px;
    animation-duration: 60s;
    animation-timing-function: steps(100);
    animation-name: loop_layer_4;
    background-image: url('~@/assets/loader/4_sky.png');
  }
}
</style>
