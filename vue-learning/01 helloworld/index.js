var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleDateString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    message: 'Bingo!',
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个项目' }
    ]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!',
    event: 'click'
  },
  methods: {
    reverseMessage: function () {
      // 反转一则字符串
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '.app-6',
  data: {
    message: `Hello Vue!`
  }
})