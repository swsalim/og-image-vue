var image = (function (vue) {
  'use strict';

  var script = {
    data () {
      return {
        message: 'Hello world!'
      }
    }
  };

  const _hoisted_1 = { class: "example" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, vue.toDisplayString($data.message), 1 /* TEXT */))
  }

  script.render = render;
  script.__file = "src/Image.vue";

  return script;

}(Vue));
