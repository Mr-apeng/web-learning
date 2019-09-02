// 设定初始数据
const BALLS_COUNT = 25
const BALL_SIZE_MIN = 10
const BALL_SIZE_MAX = 20
const BALL_SPEED_MAX = 7

// 设定画布
let para = document.querySelector('p')
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

// 设置画布尺寸为窗口内尺寸
const WIDTH = (canvas.width = window.innerWidth)
const HEIGHT = (canvas.height = window.innerHeight)

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

// 构造器
class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.exists = exists
  }
}

class Ball extends Shape {
  // 简单地说，constructor内定义的方法和属性是实例对象自己的，
  // 而constructor外定义的方法和属性则是所有实例对象可以共享的。
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists)

    this.color = color
    this.size = size
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }

  update() {
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

  collisionDetect() {
    for (let i = 0; i < balls.length; i++) {
      if (this !== balls[i]) {
        let dx = this.x - balls[i].x
        let dy = this.y - balls[i].y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + balls[i].size && balls[i].exists) {
          this.color = balls[i].color = randomColor()
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  // 简单地说，constructor内定义的方法和属性是实例对象自己的，
  // 而constructor外定义的方法和属性则是所有实例对象可以共享的。
  constructor(x, y, exists) {
    super(x, y, exists)

    this.velX = BALL_SPEED_MAX
    this.velY = BALL_SPEED_MAX
    this.color = 'white'
    this.size = 10
    this.setControls() //why? 可能是因为setControls只给EvilCircle的实例用的
  }

  draw() {
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.stroke()
  }

  checkBounds() {
    if (this.x + this.size >= WIDTH) {
      this.x = this.x - this.size
    }
    if (this.x - this.size <= 0) {
      this.x = this.x + this.size
    }
    if (this.y + this.size >= HEIGHT) {
      this.y = this.y - this.size
    }
    if (this.y - this.size <= 0) {
      this.y = this.y + this.size
    }
  }

  setControls() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
          this.x = this.x - this.velX
          break
        case 'd':
        case 'D':
        case 'ArrowRight':
          this.x = this.x + this.velX
          break
        case 's':
        case 'S':
        case 'ArrowDown':
          this.y = this.y + this.velY
          break
        case 'w':
        case 'W':
        case 'ArrowUp':
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
  collisionDetect() {
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].exists) {
        let dx = this.x - balls[i].x
        let dy = this.y - balls[i].y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + balls[i].size) {
          balls[i].exists = false;
          count--;
          para.textContent = `还剩下 ${count} 个球`;
        }
      }
    }
  }
}

let balls = []
let evilCircle = new EvilCircle(random(0, WIDTH), random(0, HEIGHT), 'true')
let count = 0;

// 每一帧都会运行的函数
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  while (balls.length < BALLS_COUNT) {
    const SIZE = random(BALL_SIZE_MIN, BALL_SIZE_MAX)
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + SIZE, WIDTH - SIZE),
      random(0 + SIZE, HEIGHT - SIZE),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      true,
      randomColor(),
      SIZE
    )
    balls.push(ball);
    count++;
    para.textContent = `还剩下 ${count} 个球`;
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw()
      balls[i].update()
      balls[i].collisionDetect()
    }
  }

  evilCircle.draw()
  evilCircle.checkBounds()
  evilCircle.collisionDetect()

  // 遍历数组是比较耗内存的做法
  // let restBalls = balls.filter(ball => ball.exists === 'true')
  // let rest = restBalls.length
  // para.textContent = `还剩下${rest}个球`

  window.requestAnimationFrame(loop)
}
// 执行动画
loop()