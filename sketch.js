            

let cols;
let rows;
let current; 
let previous; 
let damping = 0.0009;

function setup() {
  pixelDensity(1);
  createCanvas(800, 800);
  cols = 800;
  rows = 800;
 
  current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
}

//function mouseDragged() {
 // previous[mouseX][mouseY] = 3000;
//}

function draw() {
  background(225);
  loadPixels();
  
  
  
  for (let i = 1; i < cols -10; i++) {
    for (let j = 1; j < rows -10; j++) {
      previous[i][j] = (previous[i-1][j-1] + previous[i][j-1]*2.0 + previous[i+1][j-1] + 
                       previous[i-1][j]*2.0 + previous[i][j]*4.0 + previous[i+1][j]*2.0 + 
                       previous[i-1][j+1] + previous[i][j+1]*2.0 + previous[i+1][j+1])/16.0;
      previous[i][j] = previous[i][j] * 0.955;
    }
  }
  
  let mX = max(0, min(width-1, mouseX));
  let mY = max(0, min(height-1, mouseY));
  
  previous[mX][mY] = 30000;
 
  
  let divX = map(mX, 0, width, 1.0, 5.0);
  let divY = map(mY, 0, height, 1.0, 5.0);
  for (let i = 1; i < cols - 2; i++) {
    for (let j = 1; j < rows - 2; j++) {
      
      
      if (mouseIsPressed === true) {
  
        previous[mX][mY] = 50000;
        previous[mY][mX] = 50000;
        previous[50][mY] = 50000;
        previous[750][mY] = 50000
        previous[mX][50] = 50000;
        previous[mX][750] = 50000;
   
        
      //  let damping = 0.3;
  }
    
      let value =
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /2.0;

      value -= current[i][j];
      value -= value * damping;
   
      current[i][j] = value;
    
    
     
      let index = (i + j * cols) *4;
      pixels[index + 0] = current[i][j] / divX;
      pixels[index + 1] = current[i][j] / divY/divX;
      pixels[index + 2] = current[i][j]; ///divX;
    //  pixels[index + 3] = current[i][j] /divX;
   //   pixels[index + 3] = current[i][j];
      if (mouseIsPressed === true ) {
       
        pixels[index+0] = current[i][j] ; 
       pixels[index+3] = current[i][j];
    }
   
    
    }
  }
 
  
updatePixels();

  let temp = previous;
  previous = current;
  current = temp;
}