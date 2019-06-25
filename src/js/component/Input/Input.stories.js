import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import Input from '@/component/Input';
import Styled from 'vue-styled-components';

Vue.component('InputRoot', Styled.div`
width: 500px;
padding: 20px;
`);
Vue.component('Input', Input);

storiesOf('Input', module)
  // .addDecorator(Centered)
  .add('basic', () => ({
    data() {
      return {
        active: false,
      };
    },
    methods: {
      log(...args) {
        action('Modal')(args.length > 1 ? args.toString() : args[0]);
      },
    },
    template: `
      <InputRoot>
        <Input/>
        <br/>
        <Input :success="true" />
        <br/>
        <Input :error="true" message="我是錯誤訊息" />
      </InputRoot>
    `,
  }));

