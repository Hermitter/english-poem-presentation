//////////////////////////
//WHY ARE THERE DIFFERENT ANIMATION SCRIPTS?
//This was a learning experience to try and find a replacement for jQuery's .animate() function.
//////////////////////////
var allow = true;
//////////////////////////
//MOBILE SETTINGS
//////////////////////////
$(document).ready(function(){
  mobileCheck = detectmob();
  if (mobileCheck == true){
    allow = false;//checks to see if the page should allow backgroundSwap();
  }
});
//////////////////////////
//On Window Load
//////////////////////////
$(window).load(function() {
  $('#bg2-preload').remove();
   if(allow==true){$(window).scroll(backgroundSwap)};
   $('#loading-screen').fadeOut('slow');//remove loading screen after content loads
   window.onunload = function(){ window.scrollTo(0,0); }//scroll to top if page is refreshed
  //1//Curtain Button Actions
      curtainCall();//curtain animation
      $("body").css('overflow-y', 'scroll');//scroll lock release from loading
      $('#title-before-call').attr("id", "title-after-call");
      animation("#title-after-call",'fontSize',100,80,"px",-1.5);//title animation
  //2//Overlay Slide Set Up
      //Sets Up Click Function To Slide In Content
      $('.highlighted').click(function(){
          $('#overlay-exit').fadeIn('fast');//show exit layer
          TweenLite.to($('#info-overlay'), 0.5, {height:"33%"});
      });
      //Swapping Overlay Text Author's Overview
      $('#title-after-call').click(function(){
          $("body").css('overflow-y', 'hidden');//scroll stop
          $('#overlay-exit').show();//exit layer
          TweenLite.to($('#info-overlay'), 0.5, {height:"100%"});
          $('#author-life').fadeIn('fast');//content show
      })
      //Sets Up Click Function To Slide Out Content
      $('#overlay-exit').click(function(){
          if($("body").css('overflow-y') == 'hidden' ){$("body").css('overflow-y', 'scroll');}//checks body overflow for reset
          $('#overlay-exit').fadeOut('fast');//hide exit layer
          TweenLite.to($('#info-overlay'), 0.5, {height:"0%",});
          $('.overlay-text').fadeOut('fast');//content hide
        });
  //4//Swapping Overlay Text For Annotations
      //!Update Array For Every Span Element!
      var highlightedText = ['#span0','#span1','#span2','#span3','#span4','#span5','#span6','#span7','#span8','#span9','#span10','#span11','#span12','#span13','#span14','#span15','#span16'];//messy
      //Loop for Auto Setting The Click Functions
      for(i = 0; i < highlightedText.length; i++){
          $(highlightedText[i]).click(OverlayChange('#overlay-text-'+i));
      }
});
//////////////////////////
//FUNCTIONS
//////////////////////////
//background swap
function backgroundSwap(){
    var fromTopPx = 500; // distance to trigger
    var scrolledFromtop = $(window).scrollTop();
    if(scrolledFromtop > fromTopPx){
      if($('html').attr('id') == 'roadBg'){//checks if the background changed
        $('html').attr("id","wallBg");//change the background if true
      }
    }
    else{
      if($('html').attr('id') == 'wallBg'){//checks if the background changed
        $('html').attr("id","roadBg");//change the background if true
      }
    }
};

//Swaping The Overlay Text
function OverlayChange(textId){
  return function(){
    $(textId).fadeIn('fast');
  }
}
//Basic Animation builder (FAILURE)
function animation(elem,style,beginning,end,measurement,increase){
  var start = setInterval(function(){
    if (beginning < end){
      clearInterval(start);
    }
    else{
      beginning += increase;
      $(elem).css( style, ''+beginning+''+measurement);
    }
  },30);
}
//Curtain open function (PASSED BUT TO MESSY FOR MULTIPLE ANIMATIONS)
function curtainCall(){
  ropeCounter = 0;
  var startRope = setInterval(function(){
    if (ropeCounter < -49){
      clearInterval(startRope);
      $('#curtain-frame').remove();
    }
    else{
      ropeCounter -= 0.25;
      document.getElementById("left-curtain").style.left = ropeCounter + '%';
      document.getElementById("right-curtain").style.right = ropeCounter + '%';
    }
  },6.25);
}
//mobile check function
function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}







/*
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//SCRAP YARD
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//////////////////////////
//Old loading screen
//////////////////////////
var counter = 0;
var increase = Math.PI/120;

setInterval(animation,10);

function animation(){
if (document.getElementById("loading-text")){
y = Math.sin(counter*2);
  counter += increase;
  document.getElementById("loading-text").style.top = -((y*10)-40)+"px";
}
}

*/
