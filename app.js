let gameSeq=[];
let userSeq =[];
let btns = ['yellow', 'green', 'red', 'purple'];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 =document.querySelector("h3");
let body = document.querySelector('body')
let button = document.querySelector('button');

let highestScoreElement = document.getElementById("highest-score");
let highestScore = localStorage.getItem("highestScore") || 0;
highestScoreElement.innerText = highestScore;

document.addEventListener("keypress", function(){
  if (started == false) {
    console.log("game started");
    started = true;
  }
  levelUp();
});
button.addEventListener("click", function(){
  if (started == false) {
    console.log("game started");
    started = true;
  }
  levelUp();
});




function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash")
  },250);
};

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash")
  },250);
};


function levelUp(){
  userSeq=[];
  level++;
  h2.innerText =` level ${level};`

  let randIDX = Math.floor(Math.random()*4);

  let randcolor= btns[randIDX];

  let randbtn = document.querySelector(`.${randcolor}`);
   gameSeq.push(randcolor);  
   gameFlash(randbtn);
   console.log(gameSeq);

   

}

function checkAns(idx){

if(userSeq[idx]===gameSeq[idx]){
  if (userSeq.length == gameSeq.length){
    setTimeout(levelUp, 1000)
  }
}else{
  h2.innerHTML = `game over : your score was <b>${level}<b/> <br/>press any key to start`
  document.querySelector('body').style.backgroundColor = 'red'
  setTimeout(function(){
    document.querySelector('body').style.backgroundColor = 'white'
  }, 250);
  if (level > highestScore) {
    highestScore = level;
    highestScoreElement.innerText = highestScore;
    localStorage.setItem("highestScore", highestScore); // Store new highest score
  }
  reset();
} 
};


function btnPress(){

  let btn = this;
 
 userFlash(btn);
  usercolor = btn.getAttribute("id")
 userSeq.push(usercolor);

 checkAns(userSeq.length-1);
 
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
  btn.addEventListener("click", btnPress);
}

function reset(){
  userSeq =[];
  gameSeq=[];
  started = false;
  level =0;
}