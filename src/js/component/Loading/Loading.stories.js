import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import '@storybook/addon-viewport/register';

import Loading from '~/js/component/Loading';

Vue.component('loading', Loading);

storiesOf('Loading', module)
  .addDecorator(Centered)
  .add('basic', () => ({
    template: `
      <loading></loading>
    `,
    data: () => ({
    }),
    mounted() {
      action('mounted')('Loading');
    },
  }));
