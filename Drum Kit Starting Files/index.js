// const btns = document.getElementsByClassName('drum');

// for(let i = 0; i<btns.length; i++){
//     btns[i].addEventListener('click', ()=>{
//         alert('I got clicked!');
//     })
// }

// Array.from(btns).forEach((v)=>{
//     v.addEventListener('click',()=>alert('I got clicked!'))
// })

//각 버튼을 마우스로 클릭하면 실행될 method
document.querySelectorAll(".drum").forEach((v)=>{
    v.addEventListener('click', function(event){
            btnColorEffect(this);
            const whichBtn = v.textContent;
            makeSound(whichBtn);
    });
 });


 //각 버튼을 키보드로 누르면 실행될 method
 document.addEventListener('keydown',(event)=>{
    document.querySelectorAll(".drum").forEach((v)=>{
        if(event.key===v.textContent){
            btnColorEffect(v);
            makeSound(event.key);
        }
    });
 });


 //버튼 입력시 색상 변화를 통해 입력되었음을 알리기 위한 method
const btnColorEffect = (element)=>{
    element.classList.add("pressed");
    setTimeout(()=>{
        element.classList.remove("pressed");
    },200);
}


//버튼이 클릭되면 드럼소리 내주는 method
const makeSound = (key)=>{
    switch(key){
        case "w": new Audio("./sounds/tom-1.mp3").play(); break;
        case "a": new Audio("./sounds/tom-2.mp3").play(); break;
        case "s": new Audio("./sounds/tom-3.mp3").play(); break;
        case "d": new Audio("./sounds/tom-4.mp3").play(); break;
        case "j": new Audio("./sounds/crash.mp3").play(); break;
        case "k": new Audio("./sounds/kick-bass.mp3").play(); break;
        case "l": new Audio("./sounds/snare.mp3").play(); break;
        default: console.log('default case');
    }
}