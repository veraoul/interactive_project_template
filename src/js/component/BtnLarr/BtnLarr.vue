<style lang="stylus" src="./btn-larr.styl">
</style>

<template lang="pug">
  a.btn.btn-larr-root(@click="$emit('click')")
    span.icon-larr(v-if='icon')
    span.label {{label}}
</template>

<script>
  export default {
    $name: 'BtnLarr.vue',
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
