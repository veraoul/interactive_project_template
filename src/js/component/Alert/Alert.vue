<script>

export default {
  props: {
    message: [String, Array],
    type: {
      type: String,
      default: 'alert', // success
    },
    close: {
      type: Function,
    },
  },
  computed: {
    computedMessage() {
      let arr = this.message;
      if (!Array.isArray(this.message)) {
        arr = [this.message];
      }
      return arr.reduce((prev, mes) => `${prev}<p class="alert-component__msg">${mes}</p>`, '');
    },
    show() {
      if (!this.message) {
        return false;
      }
      if (Array.isArray(this.message) && this.message.length === 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    innerClose() {
      if (this.$props.close) { // props
        this.$props.close('close');
      }
      this.$emit('close', 'close');
    },
  },
};
</script>

<template lang="pug">
.alert-component(:class="type")
  .alert-component__header(:class="'alert-component__header--'+type")
    svg.alert-component__svg(viewBox="0 0 52 52")
      circle.alert-component__path.alert-component__path--circle(cx="26" cy="26" r="25" fill="none")
      path.alert-component__path.alert-component__path--check(fill="none" d="M14 27l7 7 16-16" v-if="type === 'success'")
      path.alert-component__path.alert-component__path--warning(fill="none" d="M26 12 V34 M26 37 V40 " v-else-if="type === 'warning'")
      path.alert-component__path.alert-component__path--error(fill="none" d="M13 13 L39 39 M39 13 L13 39" v-else)
  .alert-component__body
    .alert-component__messages(v-html="computedMessage")
    a.alert-component__close-btn(@click="innerClose", :class="'alert-component__close-btn--'+type") 關閉
</template>


<style lang="stylus">
.alert-component
  .alert-component__messages
    .alert-component__msg
      line-height 24px
      font-size 1em
</style>

<style lang="stylus" scoped>
$themeColors = {
  alert   : #e74c3c
  success : #27ae60
  warning : #f39c12
}
$borderRadius = 8px
$curve = cubic-bezier(0.650, 0.000, 0.450, 1.000)

@keyframes stroke
  100%
    stroke-dashoffset 0
@keyframes scale
  0%, 100%
    transform none
  50%
    transform scale3d(1.1, 1.1, 1)

.alert-component
  display inline-block
  vertical-align middle
  width 400px
  height auto
  min-height 240px
  background-color white
  border-radius $borderRadius
  box-shadow 0px 5px 10px #00000033
  &__header
    width 100%
    height 120px
    background-color $errorColor
    border-radius $borderRadius $borderRadius 0 0
    text-align center
    for key, val in $themeColors
      &--{key}
        background-color val
    &:before
      content ''
      display inline-block
      vertical-align middle
      height 100%
    .alert-component__svg
      display inline-block
      vertical-align middle
      width 82px
      height @width
      stroke-width 2
      stroke #fff
      stroke-miterlimit 10
      animation scale .3s ease-in-out .9s both
    .alert-component__path
      &--circle
        stroke-dasharray 166
        stroke-dashoffset 166
        stroke-width 2
        stroke-miterlimit 10
        fill none
        animation stroke .6s $curve forwards
      &--error
      &--check
      &--warning
        transform-origin 50% 50%
        stroke-dasharray 48
        stroke-dashoffset 48
        animation stroke .3s $curve .8s forwards
      &--warning
        stroke-width 3
  &__body
    text-align center
  &__messages
    margin 20px
  &__close-btn
    cursor pointer
    display inline-block
    width 40%
    height 40px
    line-height @height
    text-align center
    color white
    margin-bottom 20px
    border-radius $borderRadius
    transition background 0.35s
    for key,val in $themeColors
      &--{key}
        background-color val
      &:hover
        background-color lighten(val, 10)
</style>