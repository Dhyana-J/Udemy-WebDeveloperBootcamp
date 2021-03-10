const buttonColours = ["red","blue","green","yellow"];

const userClickedPattern = [];
const gamePattern = [];

let started = false;
let level = 0;

const changeTitleLevel = ()=>{
    document.querySelector('#level-title').textContent=`Level ${level}`;
}

//버튼에 fade효과를 주기 위한 method
const animatePress = (element)=>{
    element.classList.add('pressed');
    setTimeout(()=>{
        element.classList.remove('pressed');
    },200);
}

//버튼이 눌리면 소리효과를 주기 위한 method
const playSound = (state)=>{
    new Audio(`sounds/${state}.mp3`).play();
}


//누를 버튼 알려주는 method
const nextSequence = ()=>{

    resetArray(userClickedPattern);

    level++;
    changeTitleLevel();
    
    const randomNumber = Math.floor(Math.random()*4);
    const randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);
    
    animatePress(document.querySelector(`#${randomChoosenColor}`));
    playSound(buttonColours[randomNumber]);
};


//배열 초기화해주는 method
const resetArray = (arr)=>{
    arr.splice(0,arr.length);
};


//사용자가 입력한 색깔과 문제 색깔 비교검사하는 method
const checkAnswer = (currentLevel)=>{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){ //마지막 패턴까지 맞춘 경우
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }else{
        playSound('wrong');
        document.querySelector('#level-title').textContent="Game Over, Press Any Key to Restart";
        document.body.classList.add('game-over');

        setTimeout(()=>{
            document.body.classList.remove('game-over');
        },200);

        startOver();//게임에 필요한 변수 리셋
    }
};


//변수 리셋 method
const startOver = ()=>{
    resetArray(gamePattern);
    level = 0;
    started = false;
};


//버튼들에 이벤트리스너를 달아준다.
document.querySelectorAll('.btn').forEach((btn)=>{
    btn.addEventListener('click', (event)=>{

        const userChosenColour = event.target.id;
        animatePress(event.target);
        // console.log(event.target.classList); //코드가 비동기적으로 실행되므로 fade 출력됨
        playSound(userChosenColour);
        
        if(started){ //사용자가 키보드를 눌러 start한 경우에만 로직을 실행한다.
            userClickedPattern.push(userChosenColour);
            checkAnswer(userClickedPattern.length-1);
        }
    });
});



//게임시작을 위해 키보드가 입력되면 nextSequence를 실행한다.
document.addEventListener('keydown',(event)=>{
    if(!started){
        nextSequence();
        changeTitleLevel();
        started = true;
    }
});

