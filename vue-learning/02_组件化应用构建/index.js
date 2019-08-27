// component, 组件；template, 模版
Vue.component('todo-item', {
  // todo-item 组件接受一个 "prop"，类似于一个自定义特性，这个prop名为 todo
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '.app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '可以吃的' },
    ]
  }
})