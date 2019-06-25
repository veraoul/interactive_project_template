// @flow
import Vuex from 'vuex';
import Vue from 'vue';
import matchMediaPlugin from './matchMediaPlugin';
import mousePositoinPlugin from './mousePositoinPlugin';
import initPlugin from './initPlugin';

Vue.use(Vuex);

export type State = {
  loading: boolean,
  mobile: boolean,
  mouseRange: {x:number, y:number},
  windowInnerWidth: number,
  windowInnerHeight: number,
}


const defaultState:State = {
  loading: true,
  mobile: false,
  windowInnerWidth: window.innerWidth,
  windowInnerHeight: window.innerHeight,
  mouseRange: {
    x: 0, // range [-1, 1]
    y: 0, // range [-1, 1]
  },
};

// vue 裡用 this.$store.commit('loading' , true)
const mutations = {
  loading(state:State, value:boolean) {
    state.loading = value;
  },
  setMobile(state:State, value:boolean) {
    state.mobile = value;
  },
  setMouseRange(state:State, range:{x:number, y:number}) {
    state.mouseRange = range;
  },
  setWindowSize(state:State) {
    state.windowInnerWidth = window.innerWidth;
    state.windowInnerHeight = window.innerHeight;
  },
};

/*
  vue 裡用 this.$store.dispatch('loading' , true)
  methods(){
    ...Vuex.mapActions(['loading']),
  }
*/
const actions = {

};

/**
  computed:{
    ...Vuex.mapGetters(['loading'])
  },
*/
const getters = {
  mouseRangeX: ({ mouseRange }) => mouseRange.x,
  mouseRangeY: ({ mouseRange }) => mouseRange.y,
  windowWidth: ({ windowInnerWidth }) => windowInnerWidth,
  windowHeight: ({ windowInnerHeight }) => windowInnerHeight,
  isMobile: ({ mobile }) => mobile,
};

export default new Vuex.Store({
  state: defaultState,
  getters,
  actions,
  mutations,
  plugins: [matchMediaPlugin, mousePositoinPlugin, initPlugin],
});
