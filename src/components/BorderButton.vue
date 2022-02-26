<template>
  <div class="__border_button__" :class="{active, disabled}">
    <button @click="$emit('click')">
      <div class="border_box btn"
           :class="{inverted:active, shadow}"
           :style="{
              padding: `${padding}px`,
              borderWidth: `${border_size}px`,
              borderImageWidth: `${border_size}px`,
            }">
        <div class="btn_content">
          <slot/>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "BorderButton",
  props: {
    'active': {
      default: false,
    },
    'shadow': {
      default: false,
    },
    disabled: {
      default: false,
    },
    padding: {
      default: 0,
    },
    border_size: {
      default: 22,
    }
  },
}
</script>

<style lang="scss">
.__border_button__ {
  .btn_content{
    padding-top: .25em;
    padding-bottom: .25em;
  }
  button{
    margin: 0;
    padding: 0;
    color: #36634d;
  }
  &.disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.active{
    button {
      color: #FFF1E0;
    }
  }

  .border_box{
    border: 12px solid transparent;
    border-image: url('~@/assets/border/full.png');
    border-image-source: url('~@/assets/border/full.png');
    border-image-slice: 14 fill;
    border-image-width: 20px;
    box-sizing: border-box;
    &.btn{
      border-image: url('~@/assets/border/full_shadow.png');
      border-image-source: url('~@/assets/border/full_shadow.png');
      border-image-slice: 14 fill;
      border-image-width: 14px 14px 14px 14px;

    }
    &.btn:hover{
      border-image: url('~@/assets/border/full_shadow_hover.png');
      border-image-source: url('~@/assets/border/full_shadow_hover.png');
      border-image-slice: 14 fill;
    }
    &.inverted{
      border-image: url('~@/assets/border/inverted.png');
      border-image-source: url('~@/assets/border/inverted.png');
      border-image-slice: 14 fill;
      &.btn{
        border-image: url('~@/assets/border/inverted_shadow_gone.png');
        border-image-source: url('~@/assets/border/inverted_shadow_gone.png');
        border-image-slice: 14 fill;
      }
    }
    &.shadow{
      border-image: url('~@/assets/border/full_shadow.png');
      border-image-source: url('~@/assets/border/full_shadow.png');
      border-image-slice: 14 fill;
      &:hover{
        border-image: url('~@/assets/border/full_shadow_hover.png');
        border-image-source: url('~@/assets/border/full_shadow_hover.png');
        border-image-slice: 14 fill;
      }
    }
    &.shadow.inverted{
      border-image: url('~@/assets/border/inverted_shadow.png');
      border-image-source: url('~@/assets/border/inverted_shadow.png');
      border-image-slice: 14 fill;
    }
  }
}
</style>

