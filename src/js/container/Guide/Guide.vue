<style lang="stylus" src="./guide.styl">
</style>

<template lang="pug">
.guide-root
  .kv
    transition(name="fade", appear)
      Loading(v-if="loading")
  .input-root.twoinline
    Input
    br
    Input(:success="true")
    br
    Input(:error="true" message="我是錯誤訊息")
    br
  .gap 
  .button-root.twoinline
    .inner
      BtnLarr.twoinline(label="showModal Alert" @click="showModalAlert")
      .gap
      BtnRarr.twoinline(label="programmatic Success" @click="progSuccess")

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Loading from '@/component/Loading';
import Input from '@/component/Input';
import BtnLarr from '@/component/BtnLarr';
import BtnRarr from '@/component/BtnRarr';
import Alert, { alert, success } from '@/component/Alert';
export default {
  props: {},
  data: () => ({
  }),
  computed: {
    ...mapState(['loading']),
    ...mapGetters([]),
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    showModalAlert() {
      console.log('showModalAlert');
      alert('Error');
    },
    progSuccess() {
      console.log('progSuccess');
      success('success');
    },
  },
  mounted() {},
  beforeDestroy() {
  },
  components: {
    Loading,
    Input,
    BtnLarr,
    BtnRarr,
    Alert,
  },
};
</script>