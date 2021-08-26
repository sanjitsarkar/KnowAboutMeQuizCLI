const readlineSync = require('readline-sync')
const chalk = require('chalk')
const {LocalStorage} = require('node-localstorage')
const error = chalk.bold.red;
const success = chalk.keyword('green');
const title = chalk.keyword('teal').bold;
const score_title = chalk.keyword('yellow').bold;
const log = console.log
const localStorage = new LocalStorage('./quiz_app_1')
var highScoreItem = localStorage.getItem("highScores")
let score = 0;

// data of high score
let highScores = [];

let userName = ""



if(highScoreItem===null || highScoreItem==="")
{
  localStorage.setItem("highScores",highScores)
}
else{
highScores = JSON.parse(highScoreItem)

}


const getYourHighScore = (userName) => {
 highScoreItem = localStorage.getItem("highScores")
 if(highScoreItem==="")
 return undefined;
 let _highScore = JSON.parse(highScoreItem)
 if(_highScore.find((_score)=>_score.userName===userName))
 {
 return JSON.parse(highScoreItem).filter((_score)=>_score.userName===userName)[0].score
 }
 else{
   return undefined;
 }
}

const getHighestScore = () => {
highScoreItem = localStorage.getItem("highScores")

return JSON.parse(highScoreItem).reduce((a,b)=>a.score>b.score?a:b); 
}

const updateHighScore = (userName)=>{
highScoreItem = localStorage.getItem("highScores")

if(getYourHighScore(userName)===undefined)
  {
  localStorage.setItem("highScores",JSON.stringify([...highScores,{userName,score}]))
  }
  else{
     const newHighScores = JSON.parse(localStorage.getItem("highScores")).filter((_score)=>_score.userName!==userName)
     localStorage.setItem("highScores",JSON.stringify([...newHighScores,{userName,score}]))
  }
  }


// array of objects
var questions = [{
  question: "What is my hobby ?",
  answer: "Coding"
}, {
  question: "What is my favourite marvel character ?",
  answer: "Loki"
},
{
  question: "Where do I study ? ",
  answer: "BVEC"
},
{
  question: "What is my favourite fast food ? ",
  answer: "Momo"
},
{
  question: "When is my birth year ? ",
  answer: "1998"
}];


function welcome() {
 log(title("What is your name ?"))
 userName = readlineSync.question();

  log(`
Welcome ${title(userName)}
to
DO YOU KNOW Sanjit?
  `);
}


function play(question, answer) {
  log(title(question))
  var userAnswer = readlineSync.question();

  if (userAnswer.toLowerCase() === answer.toLowerCase()) { 
    log(success("\nYou are correct!"));
    score = score + 1;
    
  } else {
    log(error("\nYou are wrong!"));
    log(success("\nCorrect answer is "),score_title(answer));
   
  }

  log(title("Current Score: "), score_title(score));
  log(title("-------------\n"))
}

function game() {
  for (var i=0; i<questions.length; i++) {
    var currentQuestion = questions[i];
    play(currentQuestion.question, currentQuestion.answer)
  }
}



function showScores() {
  if(getYourHighScore(userName)===undefined)
  {
    updateHighScore(userName)
  }
  if(score>getYourHighScore(userName))
  {
    updateHighScore(userName)
  }
  log(title(`Your Final Score is ${score}`))
  log(title(`Your Highest Score is ${getYourHighScore(userName)}`))
  const overallHighestScore = getHighestScore()
  log(title("Overall Highest Score is "),overallHighestScore.score," by ",success(overallHighestScore.userName))

  
}


welcome();
game();
showScores();