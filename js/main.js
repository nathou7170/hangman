const els ={
  score: null,
  answer: null,
  choices: null,
};

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 6;

const words = [
  'JAVASCRIPT',
  'STYLESHEET',
  'BECODE',
  'VELO',
  'BATEAU',
  'HIVER',
  'BITCOIN',
  'CANNARD',
  'BIBLIOTHEQUE',
  'ORDINATEUR',
  'AMPOULE',

]

const generateChoices = () => {
  for(let index = 65; index <= 90; index++){
    choices.push(String.fromCharCode(index));
  }
  return choices;
};

const displayScore = () => {
  //els.score.innerHTML = `${scoreCount} / ${maxScore}`;
   els.score.innerHTML = `<img src="images/Hangman-${scoreCount}.png" alt="hangman" /> `;
}

const getChoicesMapping = (choices) =>{
  const choicesMapping = choices.map((letter) => {
    return {
    letter,
    isChosen: false

    };
  
  });
  return choicesMapping;

}

const init = () =>{
  //console.log('#init');

  els.score = document.querySelector('#score');
  els.answer = document.querySelector('#answer');
  els.choices = document.querySelector('#choices');


  word = pickWord();
 // console.log('word', word);
 wordMapping = getWordMapping(word);
 //console.log('wordMapping',wordMapping)
 choices = generateChoices();
 //console.log(choices);
 choicesMapping = getChoicesMapping(choices);
 //console.log(choicesMapping);
displayWord(wordMapping);

displayChoices(choicesMapping);

//displayScore();

els.choices.addEventListener('click', ({target}) =>{
  if (target.matches('li')) {
    checkLetter(target.innerHTML);

  }
});
}

document.addEventListener('keydown', ({ keyCode }) => {
  //console.log('keyCode', keyCode);
  const letter = String.fromCharCode(keyCode);
  //console.log('letter', letter);
  if (keyCode >= 65 && keyCode <= 90){
    checkLetter(letter);
  }
  

});

const checkLetter = (letter) =>{
  console.log(letter);
  let isLetterInWord = false;
  let isAllLetterFound = true;
  wordMapping.forEach((letterMapping) =>{
    if (letterMapping.letter === letter){
      letterMapping.isVisible = true;
      isLetterInWord = true;
    }
    if (!letterMapping.isVisible){
      isAllLetterFound = false;
    }
  });
  choicesMapping.forEach((letterMapping) => {
    if (letterMapping.letter === letter){
      letterMapping.isChosen = true;
    }
  });
  displayChoices(choicesMapping);
  if (isLetterInWord === true){
    displayWord(wordMapping);
  } else {
    scoreCount++;
    displayScore();
  }
  if(scoreCount === maxScore){
    endGame();
  } if (isAllLetterFound){
    winGame();
  }
};

const endGame = () => {
  wordMapping.forEach(w => w.isVisible = true);
  displayWord(wordMapping);
  document.querySelector('body').style.backgroundColor = 'red';
  els.choices.innerHTML = `<h1>YOU ARE DEAD, BRO !</h1>`;
};
const winGame = () => {
  document.querySelector('body').style.backgroundColor = 'green';
  els.choices.innerHTML = `<h1>YOU ARE ALIVE !</h1>`;
}

const displayChoices = (choicesMapping) => {
  const choicesHtml = choicesMapping.map((letterMapping) => {
    if (letterMapping.isChosen === false){
      return  `<li>${letterMapping.letter}</li>`;
    } else{
      return  `<li class="disabled">${letterMapping.letter}</li>`
    }
  });
  els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayWord = (wordMapping) => {
  const wordHtml = wordMapping.map((letterMapping) => {
    if (letterMapping.isVisible === true){
      return `<li>${letterMapping.letter}</li>`;
    } else {
      return `<li>_</li>`;
    }
  });
  els.answer.querySelector('ul').innerHTML = wordHtml.join('');
}

const pickWord = () => {
  const randomIndex = getRandomInt(0, words.length - 1);

  return words[randomIndex];
}

window.addEventListener('load', () =>{
  init();
});

const getWordMapping = (word) => {
  const wordArr = word.split('');
  console.log('word', word);
  console.log('wordArr', wordArr);
  
  const wordMapping = wordArr.map((letter, index) => {
    let isVisible = false;
    if (index === 0 || index == wordArr.length - 1){
      isVisible = true;
    }
    return {
      letter,
      isVisible
    };
  });
  return wordMapping;

};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}