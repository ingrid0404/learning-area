// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

/*
  vel - velocity
*/
class Ball {
  constructor(x, y , color, size, velX, velY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velX = velX;
    this.velY = velY;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
  }

  update() {

    if((this.x+this.size) >= width || (this.x-this.size)<=0) {
      this.velX = -(this.velX);
    }

    if((this.y+this.size) >= height || (this.y-this.size)<=0) {
      this.velY = -(this.velY);
    }

  

    this.x += this.velX;
    this.y += this.velY;

  }
  collisionDetect() {
    for (const bl of bls) {
      if (this !== bl) {
        const dx = this.x - bl.x;
        const dy = this.y - bl.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + bl.size) {
          bl.color = this.color = randomRGB();
        }
      }
    }
  }
  
}

const ball1 = new Ball(20, 40, "yellow", 10, 4, 4);

const bls = [];
while(bls.length < 40) {
  const size = random(20,50);
  const color = randomRGB();
  const x = random(0+size, width-size);
  const y = random(0+size, height-size);
  const velX = random(-7,7);
  const velY = random(-7,7);

  const bl = new Ball(x,y,color,size,velX,velY);

  bls.push(bl);
}

function loop() {
  ctx.fillStyle="rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,width,height);

  for(const bl of bls) {
    bl.draw();
    bl.update();
    //bl.collisionDetect();
  }

  requestAnimationFrame(loop);
}


loop();