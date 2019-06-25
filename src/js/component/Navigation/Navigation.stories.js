import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import Navigation from './Navigation.vue';


Vue.component('Navigation', Navigation);

storiesOf('NavigationRoot', module)
  .addDecorator(Centered)
  .add('basic', () => ({
    methods: {
      click() {
        action('BackButton')('click');
      },
    },
    template: `
      <div>
        <Navigation></Navigation>
      </div>
      `,
  }));
