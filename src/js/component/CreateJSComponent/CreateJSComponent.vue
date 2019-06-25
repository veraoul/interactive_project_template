<script>
import CreateJSHelper from './CreateJSHelper';

export default {
  props: {
    adobeAn: {
      type: Object,
      required: true,
    },
    rootComponentName: {
      type: String,
      required: true,
    },
    pause: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isManifestLoaded: false,
    };
  },
  watch: {
    pause(val:boolean) {
      this.app.isPause = val;
    },
  },
  methods: {
    getApp() {
      return this.app;
    },
    getRoot() {
      return this.app.root;
    },
  },
  mounted() {
    this.app = new CreateJSHelper(this.$refs.canvas, this.adobeAn, this.rootComponentName);
    this.app.on('start', () => {
      this.isManifestLoaded = true;
      this.$emit('start');
    });
  },
  beforeDestroy() {
    this.app.destroy();
  },
};
</script>

<template lang="pug">
.createjs-component
  canvas(ref="canvas")
</template>