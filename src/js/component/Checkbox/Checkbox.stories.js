import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import Styled from 'vue-styled-components';

import vueGlobalPlugins from '@/util/vue-global-plugins';
import CheckBox from './';

const CheckBoxRoot = Styled.div`
  font-size: 100%;
`;

vueGlobalPlugins.install(Vue);
Vue.component('CheckBox', CheckBox);
Vue.component('CheckBoxRoot', CheckBoxRoot);

storiesOf('CheckBox', module)
  .addDecorator(Centered)
  .add('Single', () => ({
    data: () => ({
      type: '',
    }),
    template: pug`CheckBoxRoot
      CheckBox(label="維修保養1" value="值0" v-model="type")
      p {{type}}
      `,
  }))
  .add('Multi', () => ({
    data: () => ({
      type: [],
    }),
    template: pug`CheckBoxRoot
      CheckBox(label="維修保養1" value="值0" v-model="type")
      CheckBox(label="維修保養2" value="值1" v-model="type")
      CheckBox(label="維修保養3" value="值2" v-model="type")
      p {{type}}
      `,
  }))
  .add('default value', () => ({
    data() {
      return {
        type: ['0', '1', '2'],
      };
    },
    template: pug`CheckBoxRoot
      CheckBox(label="維修保養1" value="0" v-model="type")
      CheckBox(label="維修保養2" value="1" v-model="type")
      CheckBox(label="維修保養3" value="2" v-model="type")
      p {{type}}
      `,
  }))
  .add('State', () => ({
    data() {
      return {
        type: [],
      };
    },
    template: pug`CheckBoxRoot
      CheckBox(label="維修保養1" value="值0" v-model="type")
      CheckBox(label="維修保養1" value="值1" v-model="type" disabled)
      CheckBox(label="維修保養1" value="值2" v-model="type" lg)
      p {{type}}
      `,
  }));
