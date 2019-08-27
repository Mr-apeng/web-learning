var obj = {
  a: '123'
}

var obj1 = {

}

Object.defineProperty(obj1, 'a', {
  // value: '456',/*
  get: function () {
    return 456
  },
  set: function (newValue) {
    alert('set')
    // this.a = newValue
  },
  // writable: true
})