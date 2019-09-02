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

// Ball.prototype.draw = () => {
// 箭头函数不能用于定义原型方法！！！！！因为里面的this继承的是外层作用域的this也就是window/Object了

Ball.prototype.draw = function() {
  // beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
  ctx.beginPath()
  // fillStyle 设置图形的填充颜色
  // strokeStyle 设置图形轮廓的颜色
  ctx.fillStyle = this.color
  // arc() 绘制圆弧或者圆，arc(x, y, radius, startAngle, endAngle, anticlockwise)
  // 画一个以（x,y）为圆心的，以radius为半径的圆弧（圆）；
  // 从startAngle开始到endAngle结束，也就是圆弧对应的夹角，单位以弧度表示。这里用的是 0 和 2 * PI，也就是 360 度（如果你设置成 0 和 1 * PI，则只会出现一个半圆，也就是 180 度）；
  // 按照anticlockwise给定的方向（默认为顺时针）来生成。false-顺时针，true-逆时针
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  // fill() 通过填充路径的内容区域生成实心的图形。
  ctx.fill()
}

Ball.prototype.update = function() {
  // 4个if，检查小球是否碰到画布的边缘。如果碰到，我们反转小球的速度方向来让它向反方向移动。
  // 检查小球的 x 坐标是否大于画布的宽度（小球会从右边缘离开）。
  if (this.x + this.size >= WIDTH) {
    this.velX = -this.velX
  }
  // 检查小球的 x 坐标是否小于0（小球会从左边缘离开）。
  if (this.x - this.size <= 0) {
    this.velX = -this.velX
  }

  // 检查小球的 y 坐标是否大于画布的高度（小球会从下边缘离开）。
  if (this.y + this.size >= HEIGHT) {
    this.velY = -this.velY
  }
  // 检查小球的 y 坐标是否小于0（小球会从上边缘离开）。
  if (this.y - this.size <= 0) {
    this.velY = -this.velY
  }

  // 在每种情况下都会加上小球的半径，因为 x/y 坐标是小球中心的坐标，这样小球在其边界接触浏览器窗口的边界时反弹，而不是小球的一部分都不见了再返回。

  // 将 velX 的值加到 x 的坐标上，将 velY 的值加到 y 坐标上 —— 每次调用这个方法的时候小球就移动这么多。
  this.x = this.x + this.velX
  this.y = this.y + this.velY
}

// 检测碰撞
Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (this !== balls[i]) {
      // 如果this 不是自己，计算两球之间的x, y
      let dx = this.x - balls[i].x
      let dy = this.y - balls[i].y
      //距离公式，根号(△x平方 + △y平方)
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[i].size) {
        balls[i].color = this.color = randomColor()
      }
    }
  }
}

// 储存一些小球
let balls = []
// 几乎所有的动画效果都会用到一个运动循环，也就是每一帧都自动更新视图。这是大多数游戏或者其他类似项目的基础。
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  // fillRect(x, y, width, height) 绘制一个填充的矩形
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // 创建25个球
  while (balls.length < 25) {
    let ball = new Ball(
      random(0, WIDTH),
      random(0, HEIGHT),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      random(10, 20)
    )
    balls.push(ball)
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
    balls[i].update()
    balls[i].collisionDetect()
  }

  window.requestAnimationFrame(loop)
  // window.requestAnimationFrame() 方法跟setTimeout 类似，都是推迟某个函数的执行。不同之处在于，setTimeout 必须指定推迟的时间，window.requestAnimationFrame() 则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台Tab 页时，requestAnimationFrame() 会暂停执行。
  // 如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
}
loop()
