<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black',
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    lineStyle() {
      return `stroke:${this.color};stroke-width:${this.strokeWidth}`;
    },
  },
};
</script>

<template lang="pug">
.icon-close(@click="$emit('click')")
  svg(height="100" width="100" viewBox="0 0 100 100")
    line(x1="0"   y1="0" x2="100" y2="100" :style="lineStyle")
    line(x1="100" y1="0" x2="0"   y2="100" :style="lineStyle")
</template>

<style lang="stylus">
.icon-close
  position relative
  cursor pointer
  transition transform 0.3s ease-in-out
  padding 5px
  &:hover
    transform rotate(90deg)
  svg
    width 100%
    height 100%
</style>