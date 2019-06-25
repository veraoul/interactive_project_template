<style lang="stylus" src="./main.styl">
</style>

<template lang="pug">
  .main-root
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    name: 'Main',
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
