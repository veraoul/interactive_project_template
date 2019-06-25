<script>
/**
 * 2018 06 05
 * @author milkmidi
 * @version 1.0.0
 */
export default {
  props: {
    component: [Object, String],
    componentProps: Object,
    events: Object,
    active: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: String,
      default: 'zoom-out',
    },
    programmatic: {
      type: Boolean,
      default: false,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    clickModalClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: this.active || false,
    };
  },
  computed: {
    isComponent() {
      return typeof this.component === 'object';
    },
    isStringTemplate() {
      return typeof this.component === 'string';
    },
  },
  watch: {
    active(val) {
      this.isActive = val;
    },
    isActive(val) {
      this.hiddenScroll(val);
    },
  },
  methods: {
    hiddenScroll(val) {
      if (typeof window === 'undefined') return;
      if (val) {
        // ios, android
        this.savedScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        document.body.classList.add('no-scroll');
        document.body.style.top = `-${this.savedScrollTop}px`;
      } else {
        document.body.classList.remove('no-scroll');
        document.documentElement.scrollTop = this.savedScrollTop;
        document.body.scrollTop = this.savedScrollTop;
      }
    },
    close(...arg) {
      this.$emit('close', arg.length > 1 ? arg : arg[0]);
      this.$emit('update:active', false);
      this.hiddenScroll(false);
      if (this.programmatic) {
        this.isActive = false;
        setTimeout(() => {
          this.$destroy();
          document.body.removeChild(this.$el);
          // this.$el.remove(); // IE not support Element remove
        }, 150);
      }
    },
    keyPressAndModalClickHandler({ target, keyCode }) {
      if (this.clickModalClose && (target === this.$refs.modalContent || keyCode === 27)) {
        this.close();
      }
    },
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPressAndModalClickHandler);
    }
  },
  beforeMount() {
    if (this.programmatic) {
      document.body.appendChild(this.$el);
    }
  },
  mounted() {
    if (this.programmatic) {
      this.isActive = true;
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPressAndModalClickHandler);
    }
  },
};
</script>

<template lang="pug">
transition(:name="animation")
  .modal-component(v-if="isActive" :class="[{active:isActive},theme]")
    .modal-component__content(@click="keyPressAndModalClickHandler" ref="modalContent")
      .modal-component__close-btn(@click="close" v-if="showCloseButton" :class="theme")
      component(
        v-if="isComponent"
        v-bind="componentProps"
        v-on="events"
        :is="component"
        @close="close")
      div(v-else-if="isStringTemplate" v-html="content")
      slot(v-else :close="close")
</template>

<!--
// slot example
  template(slot-scope="{close}")
    MyTestComponent(:close="close")
-->


<style lang="stylus" scoped>
.zoom-out-enter-active
.zoom-out-leave-active
  transition opacity 150ms ease-out

.zoom-out-enter-active .modal-component__content
.zoom-out-enter-active .modal-component__content
.zoom-out-leave-active .modal-component__content
.zoom-out-leave-active .modal-component__content
  transition transform 150ms ease-out

.zoom-out-enter
.zoom-out-leave-active
  opacity 0

.zoom-out-enter .modal-component__content
.zoom-out-enter .modal-component__content
.zoom-out-leave-active .modal-component__content
.zoom-out-leave-active .modal-component__content
  transform scale(1.05)

.modal-component
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  overflow hidden
  z-index 9999
  background-color rgba(10, 10, 10, 0.6)
  &.light
    background-color rgba(255, 255, 255, 0.9)
  &__close-btn
    position absolute
    top 10px
    right 10px
    z-index 20 
    user-select none
    -moz-appearance none
    -webkit-appearance none
    border none
    cursor pointer
    display inline-block
    font-size 0
    outline none
    vertical-align top
    background none
    width 70px
    height @width
    transition transform 0.35s ease
    &.round
      border-radius 50%
      background-color #111111
    &:hover
      transform rotate(90deg)
    &:before
    &:after
      position absolute
      left 50%
      top 50%
      background-color white
      content ""
      display block
      transform translateX(-50%) translateY(-50%) rotate(45deg)
      transform-origin center center
    &:before
      height 2px
      width 50%
    &:after
      height 50%
      width 2px
    &.light
      &:before
      &:after
        background-color black
  &__content
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
</style>