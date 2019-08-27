// vm.message 和 vm.reversedMessage建立起了依赖关系
// vm.reversedMessage 因 vm.message 变化而变化，反过来则不是
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello world',
    firstName: 'Foo',
    lastName: 'Bar',
    fullName1: 'Foo Bar'
  },
  // created() {
  //   this.fullName2 = '545455'
  // },
  // 计算属性，默认只有getter
  computed: {
    // 计算属性的getter
    reversedMessage: function () {
      // this指向vm实例
      return this.message.split('').reverse().join('')
    },
    now: function () {
      return Date.now()
    },
    fullName2: function () {
      return this.lastName + ' ' + this.lastName
    },
    // 有setter的fullName3
    // 如果设置 vm.fullName3 = 'John Doe', firstName 和 lastName 会跟着变化
    // 而fullName1 和 fullName2 都不会这样
    fullName3: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  methods: {
    reversedMessage2: function () {
      return this.message.split('').reverse().join('')
    }
  },
  watch: {
    firstName: function (val) {
      this.fullName1 = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName1 = this.firstName + ' ' + val
    }
  }
})
/**可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是
 * 完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在
 * 相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有
 * 发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，
 * 而不必再次执行函数。 */

/**这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

computed: {
 now: function () {
   return Date.now()
 }
}
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一
个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有
缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来
替代。 */

//命令式的 watch 回调
/*
var vm2 = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
*/

// 使用计算属性 computed
/*
var vm3 = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
   fullName: function () {
     return this.firstName + ' ' + this.lastName
   } 
  }
})
*/

var watchExampleVM = new Vue({
  el: '#watch-example',

})