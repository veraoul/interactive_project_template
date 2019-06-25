const plugin = () => (style) => {
  // Test Code
  style.define('add', (a, b) => a.operate('+', b));
};
module.exports = plugin;
