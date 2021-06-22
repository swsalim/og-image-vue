(function () {
  'use strict';

  Vue.component('preview', {
    props: {
      title: {
        type: String,
        "default": 'I am from a prop'
      }
    },
    template: "\n    <div>\n      <h2>{{ title }}</h2>\n      <p>static string</p>\n    </div> \n  "
  });
  new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });

}());
