//manipulating class with jQuery
// $("h1").addClass("big-title");
// $("h1").removeClass("big-title");
// $("h1").hasClass("big-title");


//manipulating text with jQuery
// $("h1").text("wow");
// $("button").text("yeahs");


//manipulating attributes with jQuery
// console.log($("a").attr("href","https://www.naver.com"));j


//manipulating event listener with jQuery
// $("button").click(function(){
//     $("h1").toggleClass("big-title");
// })

// $(document).keydown(function(event){
//     $("h1").text(event.key);
// });

// $("h1").on("mouseover",function(){
//     $("h1").toggleClass("big-title");
// })


//adding and removeing elements with jQuery
// $("h1").before("<button>New</button>");
// $("h1").after("<button>New</button>");
// $("h1").prepend("hey ");
// $("h1").append(" hello");
// $("h1").append("<a href='https://www.google.com'>Google</a>");


//Website Animations with jQuery
$("button").on('click',function(){
    // $("h1").toggle();
    // $("h1").fadeToggle();
    // $("h1").slideToggle();
    //$("h1").animate({opacity:0.5}); //only use numeric values
    $("h1").slideUp().slideDown().animate({opacity:0.5}).animate({opacity:1});
})