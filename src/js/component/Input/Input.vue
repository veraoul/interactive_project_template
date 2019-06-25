<script>
export default {
  props: {
    error: Boolean,
    success: Boolean,
    type: String,
    value: String,
    placeholder: String,
    maxlength: [Number, String],
    minlength: [Number, String],
    message: String,
  },
};
</script>

<template lang="pug">
.input-component(:class="{'input-component--error':error,'input-component--success':success}" )
  input.input(
    :error="error"
    :value="value"
    :placeholder="placeholder"
    :type="type"
    :maxlength="maxlength"
    @input="$emit('input', $event.target.value)")
  .input-component__error-message(v-show="error") {{message}}
</template>


<style lang="stylus" scoped>
  @require '~css/common'
  $errorColor = lighten(#e73a8a, 30%)
  $successColor = #5ab034
  state(s)
    color = $successColor
    if s == 'error'
      color = $errorColor
    .input
      border 1px solid color
      padding-right 2rem
      if s == 'error'
        background url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#cd201f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-x'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>") no-repeat center right 0.5rem/1rem;
      else
        background url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235eba00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'><polyline points='20 6 9 17 4 12'></polyline></svg>") no-repeat center right 0.5rem/1rem;
      &:focus
        border-color color
        box-shadow 0 0 0 2px alpha(color, 0.4)
    .input-component__error-message
      color darken(color, 20%)
  .input-component
    position relative
    .input
      width 100%
      border 1px solid #ebebeb
      padding 10px
      font-size 16px
      // transition all .3s ease
      border-radius 3px
      &:focus
        outline none !important;
        border-color: #1991eb;
        box-shadow: 0 0 0 2px rgba(70, 127, 207, 0.25);
    &__error-message
      padding-left 5px
      font-size 14px
      position absolute
      bottom -16px
    &--error
      state('error')
    &--success
      state('success')
</style>