import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import '@storybook/addon-viewport/register';

import BtnLarr from './';

Vue.component('btn-larr', BtnLarr);

storiesOf('BtnLarr', module)
  .addDecorator(Centered)
  .add('basic', () => ({
    template: `
      <btn-larr 
        label="上一步" 
        style="width: 165px"
      ></btn-larr>
    `,
    data: () => ({
    }),
    mounted() {
      action('mounted')('BtnLarr');
    },
  }));
