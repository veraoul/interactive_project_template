<script>
import YoutubePlayer from 'ml.anteater/YoutubePlayer/vue';

export default {
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    stateChange() {
    },
    onVideoProgress() {
    },
  },
  components: {
    YoutubePlayer,
  },
};
</script>

<template lang="pug">
.modal-youtube-player
  .modal-youtube-player__inner
    YoutubePlayer(
      :id="id"
      autoplay
      ref="youtubePlayer"
      @stateChange="stateChange"
      @videoProgress="onVideoProgress")
</template>

<style lang="stylus">
.modal-youtube-player
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  width 90%
  height 90%
  margin auto
  max-height 56.25vw
  &__inner
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    iframe
      display block
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      border 0
      width 100%
      height 100%
</style>