// 设定画布
let canvas = document.querySelector('canvas')
// 创建context对象，getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
let ctx = canvas.getContext('2d')

// 设定画布宽高等于浏览器宽高
const WIDTH = (canvas.width = window.innerWidth)
const HEIGHT = (canvas.height = window.innerHeight)

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 生成随机颜色的函数
function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

function Ball(x, y, velX, velY, color, size) {
  // x 和 y 坐标 —— 小球在屏幕上最开始时候的坐标。坐标的范围从 0 （左上角）到浏览器视口的宽和高（右下角）。
  // 水平和竖直速度（velX 和 velY）—— 给每个小球一个水平和竖直速度。实际上，当让这些球开始运动时候，每过一帧都会给小球的 x 和 y 坐标加一次这些值。
  // color —— 每一个小球会有自己的颜色。
  // size —— 每一个小球会有自己的大小 — 也就是小球的半径，以像素px为单位。
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.size = size
}
