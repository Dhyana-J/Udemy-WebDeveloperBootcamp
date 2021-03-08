// create random number between 1~6
const makeRandomNumber = ()=>{
    return Math.floor(Math.random()*6+1);
}

let randomNumber1 = makeRandomNumber()
let randomNumber2 = makeRandomNumber()

// set dice img whenever reload page 
const setImage = (selector,randomNumber)=>{
    document.querySelector(selector).setAttribute('src',`./images/dice${randomNumber}.png`);
}

setImage('.img1',randomNumber1);
setImage('.img2',randomNumber2);

if(randomNumber1>randomNumber2){
    document.querySelector('h1').textContent="🏆 Player 1 Wins!"
}else if(randomNumber1<randomNumber2){
    document.querySelector('h1').textContent="Player 2 Wins! 🏆"
}else{
    document.querySelector('h1').textContent="Draw!"
}