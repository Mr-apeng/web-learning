// 设定画布
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
// 设置宽高
const WIDTH = (canvas.width = window.innerWidth)
const HEIGHT = (canvas.height = window.innerHeight)

let para = document.querySelector('p')

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

// 构造器
function Shape(x, y, velX, velY, exists) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.exists = exists
}

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists)
  this.color = color
  this.size = size
}

function EvilCircle(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists)
  this.color = color
  this.size = size
}

// Ball 继承Shape
Ball.prototype = Object.create(Shape.prototype)
Ball.prototype.constructor = Ball
// EvilCircle 继承Ball
EvilCircle.prototype = Object.create(Ball.prototype)
EvilCircle.prototype.constructor = EvilCircle

Ball.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}
Ball.prototype.update = function() {
  if (this.x + this.size >= WIDTH) {
    this.velX = -this.velX
  }
  if (this.x - this.size <= 0) {
    this.velX = -this.velX
  }
  if (this.y + this.size >= HEIGHT) {
    this.velY = -this.velY
  }
  if (this.y - this.size <= 0) {
    this.velY = -this.velY
  }
  this.x = this.x + this.velX
  this.y = this.y + this.velY
}
Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (this !== balls[i]) {
      let dx = this.x - balls[i].x
      let dy = this.y - balls[i].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[i].size) {
        this.color = balls[i].color = randomColor()
      }
    }
  }
}

// 画恶魔圈
EvilCircle.prototype.draw = function() {
  ctx.beginPath()
  ctx.lineWidth = 3
  ctx.strokeStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.stroke()
}
// 把恶魔圈限定在WIDTH, HEIGHT的画布之中
EvilCircle.prototype.checkBounds = function() {
  if (this.x + this.size >= WIDTH) {
    this.x = WIDTH
  }
  if (this.x - this.size <= 0) {
    this.x = 0
  }
  if (this.y + this.size >= HEIGHT) {
    this.y = HEIGHT
  }
  if (this.y - this.size <= 0) {
    this.y = 0
  }
}
// 按下wasd键盘改变位置
EvilCircle.prototype.setControls = function() {
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'a':
        this.x = this.x - this.velX
        break
      case 'd':
        this.x = this.x + this.velX
        break
      case 's':
        this.y = this.y + this.velY
        break
      case 'w':
        this.y = this.y - this.velY
        break
      default:
        this.x = this.x
        this.y = this.y
        break
    }
  })
}
// 检测球是否进入恶魔圈
EvilCircle.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists === 'true') {
      let dx = this.x - balls[i].x
      let dy = this.y - balls[i].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[i].size) {
        balls[i].exists = 'false'
      }
    }
  }
}

let balls = []
let evilCircle = new EvilCircle(
  random(0, WIDTH),
  random(0, HEIGHT),
  20,
  20,
  'true',
  'white',
  10
)

evilCircle.setControls()

// 每一帧都会运行的函数
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  while (balls.length < 25) {
    let ball = new Ball(
      random(0, WIDTH),
      random(0, HEIGHT),
      random(-7, 7),
      random(-7, 7),
      'true',
      randomColor(),
      random(10, 20)
    )
    balls.push(ball)
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists === 'true') {
      balls[i].draw()
      balls[i].update()
      balls[i].collisionDetect()
    }
  }

  evilCircle.checkBounds()
  evilCircle.draw()
  evilCircle.collisionDetect()

  let restBalls = balls.filter(ball => ball.exists === 'true')
  let rest = restBalls.length
  para.textContent = `还剩下${rest}个球`

  window.requestAnimationFrame(loop)
}
loop()
