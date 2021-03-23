//아래와 같이 사용함으로써 여러개의 함수를 익스포트 가능하다.
module.exports.getDate = ()=>{
    const today = new Date();
    
    const options = {
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    
    return today.toLocaleString('en-us',options);
    
};

exports.getDay = ()=>{ // module.exports는 exports로 줄여쓸 수 있다.
    const today = new Date();
    
    const options = {
        weekday:'long',
    };
 
    return today.toLocaleString('en-us',options);

};