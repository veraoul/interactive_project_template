import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Centered from '@storybook/addon-centered';
import Styled from 'vue-styled-components';
import Alert, { alert, success } from '@/component/Alert';

import Modal, { open } from './';


const ModalRoot = Styled.div`
  padding: 20px;
  background-color: #d3d3d3;
`;

const ExampleButton = Styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
  font-weight: 400;
  margin: 5px;
  vertical-align: middle;
  padding: 20px;
  font-size: 18px;
  background: #1abc9c;
  color: white;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  cursor: pointer;
  &:hover{
    background: #16a085;
  }
`;

Vue.component('Modal', Modal);
Vue.component('ModalRoot', ModalRoot);

Vue.component('MyTestComponent', {
  props: {
    close: Function,
    abc: Number,
  },
  template: `
    <div>
      <h2>MyTestComponent {{abc}}</h2>
      <button @click="close">click</button>
    </div>
  `,
});

storiesOf('Modal', module)
  .addDecorator(Centered)
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
      showModal() {
        this.active = true;
      },
      close() {
        this.log('close');
      },
    },
    template: pug`ModalRoot
      ExampleButton(@click="showModal") showModal
      Modal(@close="close" :active.sync="active")
        Alert(message="Error 404" @close="active = false")`,
    components: {
      Alert,
      ExampleButton,
    },
  }))
  .add('programmatic', () => ({
    data() {
      return {
      };
    },
    methods: {
      log(...args) {
        action('Modal')(args.length > 1 ? args.toString() : args[0]);
      },
      showModalAlert() {
        // console.log(MyTestComponent);
        // open(MyTestComponent);
      },
    },
    template: pug`ModalRoot
      ExampleButton(@click="showModalAlert") showModal Alert
      `,
    components: {
      Alert,
      ExampleButton,
    },
  }))
  .add('slot', () => ({
    data() {
      return {
        active: false,
      };
    },
    methods: {
      log(...args) {
        action('Modal')(args.length > 1 ? args.toString() : args[0]);
      },
      showModal() {
        console.log(123);
        this.active = true;
      },
      close() {
        console.log('close');
      },
    },
    template: pug`ModalRoot
      ExampleButton(@click="showModal") showModal
      Modal(@close="close" :active.sync="active")
        template(slot-scope="{close}")
          MyTestComponent(:close="close")
      `,
    components: {
      Alert,
      ExampleButton,
    },
  }));
