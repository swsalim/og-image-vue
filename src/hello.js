Vue.component('preview', {
  props: {
    title: {
      type: String,
      default: 'I am from a prop'
    }
  },
  template: `
    <div>
      <h2>{{ title }}</h2>
      <p>static string</p>
    </div> 
  `
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})