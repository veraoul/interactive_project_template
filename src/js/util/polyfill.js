// https://github.com/zloirock/core-js#ecmascript-6
if (process.env.VUE_ENV !== 'server') {
  require('core-js/es6/number');
  require('core-js/fn/array/fill');
  require('core-js/fn/array/find');
  require('core-js/fn/array/from');
  require('core-js/fn/object/assign');
  require('core-js/fn/object/is');
  require('core-js/fn/object/keys');
  require('core-js/fn/object/values');
  require('core-js/fn/promise/finally');
  require('regenerator-runtime/runtime');
  require('es6-promise/auto');
}

