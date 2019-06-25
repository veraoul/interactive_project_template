<style lang="stylus" src="./btn-rarr.styl">
</style>

<template lang="pug">
  a.btn.btn-rarr-root(@click="$emit('click')")
    span.label {{label}}
    span.icon-rarr(v-if='icon')
</template>

<script>
  export default {
    $name: 'BtnRarr.vue',
    props: {
      label: String,
      icon: {
        default: true,
        type: Boolean
      },
    },
    data: () => ({
    }),
    computed: {
    },
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    components: {
    },
  };
</script>
