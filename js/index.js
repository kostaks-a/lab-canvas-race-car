const myCanvas = document.querySelector('canvas')
const ctx = myCanvas.getContext('2d')

const car = new Image()
car.src = "../images/car.png"

const bgImg = new Image()
bgImg.src = "../images/road.png"
const bgImg2 = new Image()
bgImg2.src = "../images/road.png"
let bg1y = 0
let bg2y = -myCanvas.height

const carWidth = 50
const carHeight = 50
let carX = 225
let carY = 600
let carSpeed = 2

let isMovingLeft = false
let isMovingRight = false


let gameOver = false
let animatedId


let myObstacles = [];
let frames = 0

class Component {
  constructor (width , height , color, x , y){
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.color = color
  this.x = x
  this.y = y
  }
  update() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x , this.y , this.width, this.height)
  }
}


function checkCollision(){
  const carLeft = carX
  const carRight = carX + carWidth
  const carPosTop = carY
  const carPosBottom = carY + carHeight 

  for (let i=0 ; i < myObstacles.length ; i++){
    const obstLeft = myObstacles[i].x
    const obstRight = myObstacles[i].x + myObstacles[i].width
    const obstPosTop = myObstacles[i].y
    const obstPosTbottom = myObstacles[i].y +  myObstacles[i].height
    if (carLeft < obstLeft &&
        carRight < obstRight &&
        carPosTop < obstPosTbottom
        ){
      gameOver = true
    }
  }
}



  function updateObstacles() {
    frames ++;
    if (frames % 360 === 0) {
      let height = 20
      let width = 150
      let x = Math.random() * (500-width)
      myObstacles.push(new Component(width, height, `red`, x , 0))
      
    }
    for (let i = 0; i < myObstacles.length; i++) {
      console.log (myObstacles)
      myObstacles[i].y += 1;
      myObstacles[i].update();
    }
  }








window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

function animate(){
 
  ctx.drawImage(bgImg, 0 , bg1y , myCanvas.width , myCanvas.height)
  ctx.drawImage(bgImg, 0 , bg2y , myCanvas.width , myCanvas.height)
  bg1y+=2
  bg2y+=2

  ctx.drawImage(car , carX , carY , carWidth , carHeight)

  updateObstacles()


  if (isMovingLeft && carX >0){
    carX -= carSpeed
  }
  if (isMovingRight && carX + carWidth < myCanvas.width){
    carX += carSpeed
  }

  if (bg1y > myCanvas.height){
    bg1y = -myCanvas.height
  }
  if (bg2y > myCanvas.height){
    bg2y = -myCanvas.height
  }

   checkCollision()


  if (!gameOver){
    animatedId= requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animatedId)
    }
  
   
}

  function startGame() {
    animate()

  }
};

document.addEventListener('keydown', event => {
  if (event.key === `ArrowLeft`) {
    // move paddle to the left
    isMovingLeft = true
  }
  if (event.key === `ArrowRight`) {
    // move paddle to the right
    isMovingRight = true
  }
})
document.addEventListener('keyup', () => {
  // Stop moving the paddle
  isMovingLeft = false
  isMovingRight = false
})

