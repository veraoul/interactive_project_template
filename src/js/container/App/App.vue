<style lang="stylus" src="./app.styl">
</style>

<template lang="pug">
  .app-root
    router-view
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  
  export default {
    name: 'App',
    data: () => ({
    }),
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      ...mapActions([]),
    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    mounted() {
    },
    beforeDestroy() {
    },
    components: {
    },
  };
</script>
