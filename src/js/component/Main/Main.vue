<script>
import Vuex from 'vuex';
import { Observable } from 'rxjs';
import { alert, success, warning } from '../Alert';
import { show } from '../ModalYoutubePlayer';

export default {
  data() {
    return {
    };
  },
  subscriptions: {
    size: Observable.fromEvent(window, 'resize')
      .startWith(window)
      .map(() => ({ w: window.innerWidth, h: window.innerHeight })),
  },
  computed: {
    ...Vuex.mapState(['windowInnerWidth', 'windowInnerHeight']),
  },
  methods: {
    showAlert() {
      alert('hi').then(() => {
        console.log('alert closeed');
      });
    },
    showSuccess() {
      success('success').then(() => {
        console.log('success closeed');
      });
    },
    showWarning() {
      warning('warning').then(() => {
        console.log('warning closeed');
      });
    },
    showYoutube() {
      show('-HwqFAL9jDw').then(() => {
        console.log('youtube close');
      });
    },
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
};
</script>

<template lang="pug">
  .main-root
    .logo
    h2 Main hi
    .flex I'm flex
    p {{windowInnerWidth}} x {{windowInnerHeight}}
    p size: {{size.w}} x {{size.h}}
    button(@click="showAlert") showAlert
    button(@click="showSuccess") success
    button(@click="showWarning") warning
    button(@click="showYoutube") showYoutube
    .box
</template>



<style scoped lang="stylus">
.main-root
  background-color red
  .flex
    display flex
  .logo
    bg('~img/logo.png')
  .box
    width add(10,20)
    height 20px
    background-color #0000ff
</style>
