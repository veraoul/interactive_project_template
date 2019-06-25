<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    value: [String, Number],
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: [Array, String, Boolean, Number],
    lg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerValue() {
      return this.value || this.label;
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  watch: {
    modelValue(val) {
      if (Array.isArray(this.modelValue)) {
        this.inputValue = val;
      } else {
        this.inputValue = val ? this.value : '';
      }
    },
    inputValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<template lang="pug">
.check-box(:class="{lg:lg,disabled:disabled}")
  label
    input(type="checkbox" :value="innerValue" v-model="inputValue")
    span
    | {{label}}
</template>

<style lang="stylus" scoped>
  @require '~css/index'
  .check-box
    margin-left 2px
    margin-right 8px
    display inline-block
    position relative
    background-color white
    &.disabled
      pointer-events none
      opacity .4
    &.lg
      $size = 40px
      label
        font-size 1.2em
        color #a19e9e
        line-height $size
        span
          margin-right 14px
          width $size
          height $size
          &:after
            width $size - 12px
            height @width
    label
      display flex
      cursor pointer
      color black
      font-size 1.3em
      position relative
      line-height @font-size
      &:hover
        span
          border-color #be9ad7
      input[type="checkbox"]
        position absolute
        visibility hidden
        &:checked + span
          &:after
            transform scale(1)
      span
        align-self center
        margin-right 5px
        display inline-block
        width 20px
        height @width
        border 1px solid black
        // border-radius 4px
        position relative
        transition border 0.35s ease
        &:after
          display block
          transition all 0.35s ease
          transform scale(0)
          content ''
          position absolute
          width 10px
          height @width
          background-color #be9ad7
          top 0
          left 0
          right 0
          bottom 0
          margin auto
    +m()
      $size = 30px
      line-height $size
      label
        span
          margin-right 8px
          width $size
          height $size
          &:after
            width $size - 12px
            height @width
</style>