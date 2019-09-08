const displayedImage = document.querySelector('.displayed-img')
const thumbBar = document.querySelector('.thumb-bar')

const btn = document.querySelector('button')
const overlay = document.querySelector('.overlay')

/* 遍历图片并添加至缩略图区 */
for (let i = 1; i <= 5; i++) {
  let source = `./images/pic${i}.jpg`
  const newImage = document.createElement('img')
  newImage.setAttribute('src', source)
  thumbBar.appendChild(newImage)

  // newImage.addEventListener('click', function() {
  //   displayedImage.src = this.src
  // })
  newImage.addEventListener('click', function(event) {
    displayedImage.src = event.target.src
    // displayedImage.setAttribute('src', event.target.src)
  })
  // newImage.addEventListener('click', function() {
  //   displayedImage.src = source
  // })
}

/* 编写 变亮/变暗 按钮 */
btn.addEventListener('click', function() {
  if (btn.getAttribute('class') === 'dark') {
    btn.setAttribute('class', 'light')
    btn.textContent = '变亮'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  } else {
    btn.className = 'dark'
    btn.textContent = '变暗'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }
})