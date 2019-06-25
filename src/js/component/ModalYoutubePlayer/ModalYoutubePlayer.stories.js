import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import Styled from 'vue-styled-components';

// import vueGlobalPlugins from '@/util/vue-global-plugins';
import ModalYoutubePlayer from './';

// vueGlobalPlugins.install(Vue);
const ModalYoutubePlayerRoot = Styled.div`
  padding: 50px;
  background-color: #d3d3d3;
`;

Vue.component('ModalYoutubePlayer', ModalYoutubePlayer);
Vue.component('ModalYoutubePlayerRoot', ModalYoutubePlayerRoot);

storiesOf('ModalYoutubePlayer', module)
  .addDecorator(Centered)
  .add('basic', () => ({
    data: () => ({
    }),
    methods: {
      log(...args) {
        action('Modal')(args.length > 1 ? args.toString() : args[0]);
      },
    },
    template: pug`ModalYoutubePlayerRoot
      ModalYoutubePlayer`,
  }));
