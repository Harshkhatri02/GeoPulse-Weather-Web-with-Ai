// const THREE = require(path.join('C:','User','dell','three'));
const scroll = new LocomotiveScroll({
    el: document.querySelector('.container'),
    smooth: true
});

// gsap.from('#my-p',{
//     stagger:.2,
//     opacity:0,
//     y:10
// });


// Follows the cursor


// Shery.makeMagnet("#my-p" /* Element to target.*/, {
//   //Parameters are optional.
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   duration: 1,
// });

//Round cursor and zoom in image

// Shery.imageMasker("#my-p" /* Element to target.*/, {
//   //Parameters are optional.
//   mouseFollower: true,
//   text: "Harsh",
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   duration: 1,
//   debug:true
// });

//Black dot following cursor
Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,

});

//Circle Video or image on hover on a element

// Shery.hoverWithMediaCircle("#my-p" /* Element to target.*/, {
  // images: ["image1.jpg","image2.jpg","image3.jpg"] /*OR*/,
  //videos: ["video1.mp4", "video2.mp4"],
  //});
  
//#0f0f07 Color for the snow img ALSO Can Make Liquid effect
Shery.imageEffect(".img", {
  style: 2, //Select Style
  // debug: true, // Debug Panel
  config:{"resolutionXY":{"value":100},"distortion":{"value":false},"mode":{"value":-3},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":2},"speed":{"value":20.27,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":1185047},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":"99999","range":[-9999999,9999999]},"aspect":{"value":1.0065530422786193},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
  // {"resolutionXY":{"value":100},"distortion":{"value":false},"mode":{"value":-3},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":2},"speed":{"value":20.27,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":1185047},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":"9996999","range":[-9999999,9999999]},"aspect":{"value":0.8000454648783815},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
  // preset: "./presets/wigglewobble.json",
});

Shery.imageEffect(".img-child-section", {
  style: 5,
  // debug: true,
  // gooey: true,
  config: {"a":{"value":1.37,"range":[0,30]},"b":{"value":-0.91,"range":[-1,1]},"zindex":{"value":"1","range":[-9999999,9999999]},"aspect":{"value":0.710354540776252},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.15,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}},
  //{"a":{"value":0.69,"range":[0,30]},"b":{"value":-0.99,"range":[-1,1]},"zindex":{"value":"999999","range":[-9999999,9999999]},"aspect":{"value":4.292091007583966},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.09,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.08,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0.1,"range":[0,0.1]},"noise_height":{"value":0.32,"range":[0,2]},"noise_scale":{"value":9.16,"range":[0,100]}},
  // {"a":{"value":2.29,"range":[0,30]},"b":{"value":-0.92,"range":[-1,1]},"zindex":{"value":"1","range":[-9999999,9999999]},"aspect":{"value":0.710354540776252},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.15,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}},
  // {"a":{"value":1.15,"range":[0,30]},"b":{"value":-0.98,"range":[-1,1]},"zindex":{"value":"999999999999","range":[-9999999,9999999]},"aspect":{"value":1.0023353839143312},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}}
});

Shery.imageEffect(".image-container-4th", {
  style: 5,
  // debug: true,
  gooey: true,
  config:{"a":{"value":2.29,"range":[0,30]},"b":{"value":-0.99,"range":[-1,1]},"zindex":{"value":"99999","range":[-9999999,9999999]},"aspect":{"value":4.292091007583966},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":3.14,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.03,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.15,"range":[0,10]},"metaball":{"value":0.15,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0.1,"range":[0,0.1]},"noise_height":{"value":0.05,"range":[0,2]},"noise_scale":{"value":0,"range":[0,100]}},
   //{"a":{"value":2.29,"range":[0,30]},"b":{"value":-0.92,"range":[-1,1]},"zindex":{"value":"1","range":[-9999999,9999999]},"aspect":{"value":0.710354540776252},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.15,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}},
  // {"a":{"value":1.15,"range":[0,30]},"b":{"value":-0.98,"range":[-1,1]},"zindex":{"value":"999999999999","range":[-9999999,9999999]},"aspect":{"value":1.0023353839143312},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.31,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}},
});

const  btn1ForSlide = document.getElementById("slide-btn-1");

const  btn2ForSlide = document.getElementById("slide-btn-2");
const  innerSlider = document.querySelector(".inner");
var counter = 0;


// function dark(){
//   console.log("clicked");
//   document.querySelector('html').classList.toggle('d-n-l-mode');
//   document.querySelector('.logo h4').style.backgroundImage = url('cloud.jpg');
  
  
//   document.querySelector('nav h4').style.color="white";
//   document.querySelector('nav ul').style.color="white";
//   document.querySelector('nav button').style.color="white";
// }
// Get the dots
var dots = document.querySelectorAll('.dot');

// Highlight the first dot at the start
dots[counter].classList.add('active');

//----------------Slider Functions-------------------------
function scrollBehaviorForSlide() {
  innerSlider.style.scrollBehavior = 'auto';
}

setTimeout(function() {
  scrollBehaviorForSlide();
}, 1000);
btn1ForSlide.addEventListener("click",()=>{
  if (counter > 0) {
    var totalWidth = innerSlider.scrollWidth - innerSlider.clientWidth;
    var scrollAmount = -((50 / 100) * totalWidth);
    innerSlider.style.scrollBehavior = 'smooth';
    innerSlider.scrollLeft += scrollAmount;
    scrollBehaviorForSlide();

    // Update the dots
    dots[counter].classList.remove('active');
    counter--;
    dots[counter].classList.add('active');
  }  
})

btn2ForSlide.addEventListener("click",()=>{
  if (counter < dots.length - 1) {
    var totalWidth = innerSlider.scrollWidth - innerSlider.clientWidth;
    var scrollAmount = (50 / 100) * totalWidth;
    innerSlider.style.scrollBehavior = 'smooth';
    innerSlider.scrollLeft += scrollAmount;
    scrollBehaviorForSlide();

    // Update the dots
    dots[counter].classList.remove('active');
    counter++;
    dots[counter].classList.add('active');
  }
  
})


let currentIndex = 0;

function scrollReviews(direction) {
  const reviews = document.querySelectorAll('.child-review');

   currentIndex += direction;

   if (currentIndex >= reviews.length) currentIndex = 0;
   if (currentIndex<0) currentIndex = reviews.length -1;
   const newScrollLeft = reviews[currentIndex].offsetLeft;
   
   document.querySelector('.reviews').scrollTo({
      left:newScrollLeft,
      behavior:'smooth'
   });
}

// Automatic scrolling
setInterval(() => {
  scrollReviews(1);
}, 5000); // Change this to adjust the scrolling speed

// const reviews = document.querySelectorAll('.child-review');

// // Loop through each review
// reviews.forEach(review => {
//     // Get the p tag within the current review
//     const pTag = review.querySelector('p');

//     // Add a line break after the p tag
//     pTag.innerHTML = pTag.innerHTML + '<br>';
// });

// // // Simple review slider
// let scrollPos = 0;
// const reviews = document.querySelector('.reviews');

// reviews.addEventListener('scroll', function() {
//   if ((reviews.scrollLeft - scrollPos) > 0) {
//     // Scrolling to the right
//     scrollPos = reviews.scrollLeft;
//     // Add your code here for right arrow click
//   } else {
//     // Scrolling to the left
//     scrollPos = reviews.scrollLeft;
//     // Add your code here for left arrow click
//   }
// });

  
  

