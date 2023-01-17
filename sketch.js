let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;
let removei=1000;
let removej=1000;
let mode;

let next = false;

var buttonx;
var buttono;

let flag = 0;
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let count = 0;

function setup() {
  mode = -1;
  createCanvas(400,400);
  aiFirstMove = false;
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  
  //L
  if(mode == 1 || mode == 2 || mode ==3){
    if(equals3(board[0][0], board[0][1], board[1][0])){
     winner = board[0][0];
    }
    if(equals3(board[0][2], board[0][1], board[1][2])){
      winner = board[0][2];
    }
    if(equals3(board[2][2], board[1][2], board[2][1])){
      winner = board[2][2];
    }
    if(equals3(board[2][0], board[1][0], board[2][1])){
      winner = board[2][0];
    }
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if(mode == 1 || mode == 4){
   if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
        board[i][j] = human;
        count++;
        currentPlayer = ai;
        if(count<5){
          bestMove();
        }
      }
    } 
  }
  if(mode == 2){
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[i][j] == ''){
      removei = i*w;
      removej = j*h;
      board[i][j] = 'not allowed';
    }
    next = true;
    mode = 3;
    loop();
  }
  if(mode == 3){
    if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
        board[i][j] = human;
        count++;
        currentPlayer = ai;
        if(count<5){
          bestMove();
        }
      }
    } 
  }
}

function xPressed(){
  flag = 1;
  mode = 0;
}

function oPressed(){
  mode = 0;
}

function draw() {
  clear();
  if(mode == -1){
    resizeCanvas(1200,500);
    text('----------------------WELCOME TO THE GAME----------------------',20,40,650);
    text('Choose your symbol : ',220,130);
    textSize(23);
    buttonx = createImg('X.png',"");
    buttono = createImg('O.png',"");
    buttonx.position(80,180);
    buttonx.size(230,230);
    buttono.position(350,180);
    buttono.size(230,230);
    buttonx.mousePressed(xPressed);
    buttono.mousePressed(oPressed);
  }
  if(mode == 0){
    aiFirstMove = false;
    currentPlayer = human;
    count = 0;
    removei=1000;
    removej=1000;
    resizeCanvas(1200,500);
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    removeElements();
    fill('black');
    textWrap(WORD);
    textSize(25);
    text('------------------------------MAIN MENU-----------------------------\n\nHello!\n\n 1. Enter Right_arrow key if you want to play against unbeatable AI \n\n2. Up_arrow key if you want to play with L rule\n\n3. Down_arrow key if you want to play with one blocked square and L rule\n\nEnter Escape key anytime to return back to Main Menu',20,40,650,400);
    textSize(21);
  }
  if(mode == 1){
    resizeCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    //background(255);
    strokeWeight(4);

    if(aiFirstMove == false){
      bestMove();
      aiFirstMove = true;
    }
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if(flag){
          if (spot == human) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          } else if (spot == ai) {
            noFill();
            ellipse(x, y, r * 2);
          }
        }
        else{
          if (spot == human) {
            noFill();
            ellipse(x, y, r * 2);
          } else if (spot == ai) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          }
        }
      }
    }

    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '28pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        if(flag){
          if (result == 'X')
            result = 'O'
          else
            result = 'X'
        }
        resultP.html(`${result} wins!`);
      }
    }
  }
  if(mode == 2 || mode == 3){
    resizeCanvas(400,400);
    w = width / 3;
    h = height / 3;
    //background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if(flag){
        if (spot == human) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          } else if (spot == ai) {
            noFill();
            ellipse(x, y, r * 2);
          }
        }
        else{
          if (spot == human) {
            noFill();
            ellipse(x, y, r * 2);
          } else if (spot == ai) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          }
        }
      }
    }
    
    if(removei < 1000 && removej < 1000){
      fill('red');
      square(removei+1,removej+1,(width/3)-2);
    } 
    
    if(next == false){
      let msg = createP('Click on the square you want to block');
      msg.style('font-size', '25pt');
      noLoop();
    }
    else if(next == true){
      if(aiFirstMove == false){
      bestMove();
      aiFirstMove = true;
    }
    }   

    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '28pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        if(flag){
          if (result == 'X')
            result = 'O'
          else
            result = 'X'
        }
        resultP.html(`${result} wins!`);
      }
    }
  }
  if(mode == 4){
    resizeCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    //background(255);
    strokeWeight(4);

    if(aiFirstMove == false){
      bestMove();
      aiFirstMove = true;
    }
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if(flag){
          if (spot == human) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          } else if (spot == ai) {
            noFill();
            ellipse(x, y, r * 2);
          }
        }
        else{
          if (spot == human) {
            noFill();
            ellipse(x, y, r * 2);
          } else if (spot == ai) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
          }
        }
      }
    }

    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '28pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        if(flag){
          if (result == 'X')
            result = 'O'
          else
            result = 'X'
        }
        resultP.html(`${result} wins!`);
      }
    }
  }

}

function keyPressed(){
  if(keyCode === UP_ARROW){
    mode = 1;
    count = 0;
  }
  if(keyCode === DOWN_ARROW){
    mode = 2;
    count = 0;
  }
  if(keyCode === RIGHT_ARROW){
    mode = 4;
    count = 0;
  }
  if(keyCode === ESCAPE){
    mode = 0;
    count = 0;
    loop();
  }
}

