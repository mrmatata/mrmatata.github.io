/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer,gamePlaying,lastScore ;

// winningScore= prompt("enter the winning score : ");// avoid using alert,prompt
init();

// document.querySelector('#current-'+activePlayer).textContent = dice;
// document.querySelector('#current-'+(activePlayer-1)).innerHTML='<h3>'+ dice +'</h3>';


//  var x= document.querySelector('#score-0').textContent;
//  console.log(x);



//ROLL BUTTON ***************************************
document.querySelector('.btn-roll').addEventListener('click',function(){
  if(gamePlaying){
  //random number
  var dice;
  dice =Math.floor(Math.random()*6)+1;

  //display the result
  var diceDOM=document.querySelector('.dice');
  diceDOM.style.display='block';
  diceDOM.style.opacity=1;
  diceDOM.src='../starter/images/dice-' +dice+'.png';

  if (dice=== 6 && lastScore === 6){
    //player loses score
    score[activePlayer]=0;
    document.querySelector('#current-'+activePlayer).textContent=0;
    nextPlayer();
  }
  //update roundScore if rolled number was not 1
  else if (dice !== 1){
    //add score
    roundScore+=dice;
    document.querySelector('#current-'+activePlayer).textContent=roundScore;
  } else{
    //next player
    nextPlayer();
  }
  lastScore=dice;
}
});

// HOLD BUTTON************************************
document.querySelector('.btn-hold').addEventListener('click',function(){
  if(gamePlaying){
//add current score to global score
score[activePlayer]+=roundScore;
//update UI
document.getElementById('score-'+activePlayer).textContent=score[activePlayer];
//check if player won the game

var input= document.querySelector('.winningValue').value;
var winningValue;
//Undefined, null, 0 and "" are coerced to false
//anything else is coerced to true
if(input){
  winningValue=input;
}else {winningValue=30;}

if(score[activePlayer]>=winningValue){
  document.querySelector('#name-'+activePlayer).textContent=' WINNER!!!';
  document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
  document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
  document.querySelector('.dice').style.display='none';
  gamePlaying=false;
} else{
    //next player
    nextPlayer();
}
  }
  
 
});

// NEW GAME BUTTON ************************************
document.querySelector('.btn-new').addEventListener('click',init)

//nextPlayer function
function nextPlayer(){
  activePlayer === 0? activePlayer= 1 : activePlayer= 0 ;
    roundScore=0;
    document.getElementById('current-0').textContent=roundScore;
    document.getElementById('current-1').textContent=roundScore;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.add('active');
    // document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.dice').style.opacity=0.5;
}

//init function
function init(){

score=[0,0];
roundScore= 0 ;
activePlayer = 0;
gamePlaying=true;

document.querySelector('.dice').style.display='none';
document.querySelector('.dice').style.opacity=1;
document.getElementById('score-0').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-1').textContent='0';

//for new game
document.querySelector('#name-0').textContent=' Player 1';
document.querySelector('#name-1').textContent=' Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}