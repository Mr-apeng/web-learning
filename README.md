# web-learning
# js 随记

1、   

```javascript
	let dv1 = document.getElementsByTagName('div')
	// 返回的是 HTMLCollection
	// HTMLCollection 是一个节点对象的集合，只能包含元素节点(element)，不能包含其他类
	// 型的节点。它的返回值是一个类似数组的对象，但是与NodeList接口不同，
	// HTMLCollection 没有forEach方法，只能使用for循环遍历。
	let dv2 = document.querySelectorAll('div')
	//NodeList实例是一个类似数组的对象，它的成员是节点对象
	//NodeList实例很像数组，可以使用length属性和forEach方法
```

