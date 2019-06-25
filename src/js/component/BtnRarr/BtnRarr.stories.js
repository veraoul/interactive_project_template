import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import '@storybook/addon-viewport/register';

import BtnRarr from '~/js/component/BtnRarr';

Vue.component('btn-rarr', BtnRarr);

storiesOf('BtnRarr', module)
  .addDecorator(Centered)
  .add('basic', () => ({
    template: `
      <btn-rarr 
        label="下一步" 
        style="width: 165px"
      ></btn-rarr>
    `,
    data: () => ({
    }),
    mounted() {
      action('mounted')('BtnRarr');
    },
  }));
