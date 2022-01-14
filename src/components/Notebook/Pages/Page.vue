<template>
  <div class="__page__">
    <div class="page_head">
      <slot name="head"></slot>
    </div>
    <div class="page_content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",
}
</script>

<style lang="scss">
.__page__ {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .page_head{
    flex-grow: 0;
    height:90px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #816647;
      font-size: 1.15em;
      font-weight: normal;
    }
    &:after {
      position: absolute;
      bottom:0;
      content: '';
      display: block;
      height: 0;
      width: 100%;
      margin-top: 10px;
      border-top: 6px solid #f5e6d5;
      border-bottom: 4px solid #ebdccb;
    }
  }
  .page_content {
    width: 100%;
    height: calc(100% - 90px);
    overflow: auto;
  }
}
</style>

