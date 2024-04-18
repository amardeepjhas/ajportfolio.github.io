/* jslint browser: true */
/* global $, gsap, window */

// set initial screen number
let screenNum = 1;

// total number of screens
let totalScreens = $("section").length;

// transition duration
let duration = 1;

// delay for starting screen animations
// make equal to duration... The time it takes content to transition off screen
// add more time to delay the build on a little more
let delay = duration + 0.5;

// disables nav when transitioning from screen to screen
let navActive = true;

// vars used for nav
let currentScreen, prevScreen, nextScreen;

// hides all screens except for screen 1
$("section:gt(0)").hide();

// set up main div on paused timeline until begin button clicked
let main = gsap.from("main", {
    duration: duration,
    opacity: 0,

      //make button slide in from off the screen
      y: $(window).height(),
      ease: "back-out",
      onComplete: function() {
    
        // set volume of BG music to zero
        $("#background").prop("volume", 0);

        // play BG music
        $("#background").trigger("play");
    

        // fade in BG music to 20% volume
        $("#background").animate({volume: 0.1}, 2000);
    
    }
}).pause();


// set up begin button on paused timeline until page load
let begin = gsap.from("#btnContainer", {
    duration: duration,
    opacity: 0,

    //make button slide in from off the screen
    y: $(window).height(),
    ease: "back-out",

    onReverseComplete: function() {

        // animate first screen
        loadScreen1();

        // show main div
        $("main").show();

        // animate main content
        main.play();
        console.log(" reverse complete");
    }
}).pause();

// preload all content and then reveal begin button
// what event checking for
$(window).on("load", function() {

  
    // fade out the preloader GIF
    gsap.to("#loading", {
        duration: duration + 2,
        opacity: 0,
        onComplete: function() {
            
            $("#begin").show();
            // play the begin GSAP
            begin.play();
        }
    });

});

// begin button click function
$("#begin").click(function() {
    // reverse the button animation timline
    begin.reverse();
});

// next and previous navigation functions
function showNextScreen() {

    if(navActive) {
        // disable nav
        navActive = false;

        // target the current screen
        currentScreen = "#screen" + screenNum;

        // Sets next screen number
        screenNum++;

        // show/hide Nav
        showHideNav(screenNum);

        // target next screen
        nextScreen = "#screen" + screenNum;

        // Transition the current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: duration,
            delay: 0.5,
            x: -960,
            ease: "power2.inOut"
        });
    }

    // show the next screen
    $(nextScreen).show();

    // transition next screen in
    // Transition the current screen out
    gsap.fromTo(nextScreen, {
        x: 960
    }, {
        duration: duration,
        delay: 0.5,
        x: 0,
        ease: "power2.inOut",
        onComplete: function(){
            // hide current screen
            $(currentScreen).hide();
            // enable nav
            navActive = true;
        }
    });

    // load function to animate on contents of the screen
    window["loadScreen" + screenNum]();
    
    // stop voiceover from playing
    $("#voiceover").trigger("pause");
}

function showPrevScreen() {

    if(navActive) {
        // disable nav
        navActive = false;

        // target the current screen
        currentScreen = "#screen" + screenNum;

        // ! Reverse
        // Sets prev screen number
        screenNum--;

         //! call the showHide function w/ screenNum as parameter
        //!  NOT currentScreen because that is a string 
        // show hide nav
        showHideNav(screenNum);

         // ! prev
        // target prev screen
        prevScreen = "#screen" + screenNum;

        // Transition the current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: duration,
            delay: 0.5,
            x: 960,
            ease: "power2.inOut"
        });
    }

    //! show the prev screen
    $(prevScreen).show();

    // transition next screen in
    // Transition the current screen out
    gsap.fromTo(prevScreen, {
        x: -960
    }, {
        duration: duration,
        delay: 0.5,
        x: 0,
        ease: "power2.inOut",
        onComplete: function(){
            // hide current screen
            $(currentScreen).hide();
            // enable nav
            navActive = true;
        }
    });

    // load function to animate on contents of the screen
    window["loadScreen" + screenNum]();
    
    // stop voiceover from playing
    $("#voiceover").trigger("pause");
}

// next and previous button clicks
$("#next").click(showNextScreen);
$("#prev").click(showPrevScreen);

// show/hide next/prev buttons
function showHideNav(currentScreen) {

    // 1. First slide hide the prev nav button
    // 2. Hide the next button on the final slide.
    if(currentScreen == 1) {
        $("#prev").fadeOut(1000);
        $("#next").fadeIn(1000);
    }  else if (currentScreen == totalScreens) {
        $("#prev").fadeIn(1000);
        $("#next").fadeOut(1000);
    } else {
        $("#prev").fadeIn(1000);
        $("#next").fadeIn(1000);
    }
}

// set up nav on page load
showHideNav(1);

// LOAD SCREEN AUDIO ///////////////////////////////////////////
function loadScreenAudio() {

    //change source of audio track
    $("#voiceover").attr("src","audio/screen" + screenNum + ".mp3");

    //tell the new source to play
    $("#voiceover").trigger("play");

    // fade in BG music to 20% volume
    $("#voiceover").animate({volume: 0.3}, 2000);
}

// CONTROL BACKGROUND AUDIO ////////////////////////////////////
$("#playPause").click(function(){

    let symbol = $("#playPause div");

    if(symbol.hasClass("pause")) {

        // pause background music
        $("#background").trigger("pause");

        // switch classes to change css icon
        symbol.removeClass("pause").addClass("play");
    } else {

        //play background music
        $("#background").trigger("play");

        //switch classes
        symbol.removeClass("play").addClass("pause");
    }
});

// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1() {
    // animate content on with delays
    gsap.from("#screen1 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from("#screen1 h2", {
        duration: duration,
        delay: delay + 0.5,
        opacity: 0
    });
    // apply sound effect
    
    gsap.from("#screen1 h4", {
        duration: duration,
        delay: delay + 1,
        opacity: 0
    });
    // apply sound effect
    
    gsap.from("#p1", {
        duration: duration,
        delay: delay + 1.5,
        scale: 0,
        left: 20,
        ease: "ease.Out"
    });
    // apply sound effect
    
    gsap.from("#p2", {
        duration: duration,
        delay: delay + 2,
        scale: 0,
        left: 20,
        ease: "ease.Out"
    });
    
    // apply sound effect
    gsap.delayedCall(delay + 0.5, function(){
        $("#pop1").trigger("play");
    });
    
    gsap.from("#p3", {
        duration: duration,
        delay: delay + 2.5,
        scale: 0,
        left: 20,
        ease: "ease.Out"
    });
    // apply sound effect
    
    // start voiceover
    gsap.delayedCall(delay + 2.5, loadScreenAudio);
}

// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2() {
    // animate content on with delays
    gsap.from("#screen2 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    //animate in our element
    gsap.from("#ele1", {
        duration: duration,
        delay: delay + 0.5,
        x: -200,
        ease: "ease.Out"
    });

    gsap.from("#ele2", {
        duration: duration,
        delay: delay + 1,
        x: -200,
        ease: "ease.Out"
    });

    $("#imageB").click(function(){
        gsap.to("#ele2img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele3", {
        duration: duration,
        delay: delay + 1.5,
        x: -200,
        ease: "ease.Out"
    });

    $("#imageBe3").click(function(){
        gsap.to("#ele3img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele4", {
        duration: duration,
        delay: delay + 2,
        y: 200,
        ease: "ease.Out"
    });

    gsap.from("#ele5e", {
        duration: duration,
        delay: delay + 2.5,
        y: 200,
        ease: "ease.Out"
    });

    $("#imageB2").click(function(){
        gsap.to("#ele5img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele6e", {
        duration: duration,
        delay: delay + 3,
        x: 200,
        ease: "ease.Out"
    });

    $("#imageB3").click(function(){
        gsap.to("#ele6img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele7e", {
        duration: duration,
        delay: delay + 3.5,
        x: 200,
        ease: "ease.Out"
    });

    $("#imageB4").click(function(){
        gsap.to("#ele7img", {opacity:1, ease:"ease.Out"});
    });
    
    
    // start voiceover
    gsap.delayedCall(delay + 3.5, loadScreenAudio);

}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3() {
    // animate content on with delays
    gsap.from("#screen3 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from("#ele8e", {
        duration: duration,
        delay: delay + 0.5,
        x:-250,
        ease: "ease.Out"
    });

    gsap.from("#ele9e", {
        duration: duration,
        delay: delay + 1,
        x:-250,
        ease: "ease.Out"
    });

    $("#imageB5").click(function(){
        gsap.to("#green1", {opacity:1, ease:"ease.Out"});
    });

    $("#imageB6").click(function(){
        gsap.to("#green2", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele10e", {
        duration: duration,
        delay: delay + 1.5,
        y:200,
        ease: "ease.Out"
    });

    gsap.from("#ele11e", {
        duration: duration,
        delay: delay + 2,
        y:200,
        ease: "ease.Out"
    });

    $("#imageB7").click(function(){
        gsap.to("#ele11img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele12e", {
        duration: duration,
        delay: delay + 2.5,
        x:250,
        ease: "ease.Out"
    });

    gsap.from("#ele13e", {
        duration: duration,
        delay: delay + 3,
        x:250,
        ease: "ease.Out"
    });

    gsap.from("#ele14e", {
        duration: duration,
        delay: delay + 3.5,
        x:250,
        ease: "ease.Out"
    });
    //* using math to modify the delay
    //animate multiple elements at once
    // gsap.from("#ele5, #ele6", {
    //     duration: duration,
    //     delay: delay + 1.5,
    //     scale: 0,
    //     ease: "elastic.out"
    // });

    // //animate multiple elements at once
    // gsap.from("#ele7, #ele8", {
    //     duration: duration,
    //     delay: delay + (duration * 2),
    //     scale: 0,
    //     ease: "elastic.out"
    // });

    // //animate multiple elements at once
    // gsap.from("#ele7instructions", {
    //     duration: duration,
    //     delay: delay + (duration * 3),
    //     scale: 0,
    //     ease: "elastic.out"
    // });

    // // Single Tween Hover
    // $("#ele8").hover(function (){
    //     gsap.to("#ele8hover",{
    //         duration: 0.5,
    //         right: 100,
    //         ease: "elastic.out"
    //     });
    //     //! reset the function when there is no hover off
    // }, function() {
    //     gsap.to("#ele8hover",{
    //         duration: 0.5,
    //         right: -100,
    //         ease: "elastic.in"})
       
    // });

    // // Multi-Tween Hover
    // $("#ele7").hover(function(){
    //     gsap.to(this, {
    //         duration: 0.5,
    //         width: 200,
    //         height: 200,
    //         ease:"power3.out"
    //     });

    //     gsap.to("#ele7content",{
    //         duration: 0.5,
    //         delay: 0.5,
    //         opacity: 1
    //     });
    // }, function(){
    //     //reverse our animation when hover off
    //     gsap.to("#ele7content",{
    //         duration: 0.5,
    //         opacity: 1
    //     });

    //     gsap.to(this, {
    //         duration: 0.5,
    //         width: 100,
    //         height: 100,
    //         ease:"power3.in"
    //     });
    // });
    
    
    // start voiceover
    gsap.delayedCall(delay + 3.5, loadScreenAudio);
}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4() {
    // animate content on with delays
    gsap.from("#screen4 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from("#ele15e", {
        duration: duration,
        delay: delay + 0.5,
        x:-250,
        ease: "ease.Out"
    });

    gsap.from("#ele16e", {
        duration: duration,
        delay: delay + 1,
        x:-250,
        ease: "ease.Out"
    });

    gsap.from("#ele17e", {
        duration: duration,
        delay: delay + 1.5,
        x:-250,
        ease: "ease.Out"
    });

    gsap.from("#ele18e", {
        duration: duration,
        delay: delay + 2,
        y:200,
        ease: "ease.Out"
    });

    gsap.from("#ele19e", {
        duration: duration,
        delay: delay + 2.5,
        x:250,
        ease: "ease.Out"
    });

    gsap.from("#ele20e", {
        duration: duration,
        delay: delay + 3,
        x:250,
        ease: "ease.Out"
    });

    gsap.from("#ele21e", {
        duration: duration,
        delay: delay + 3.5,
        x:250,
        ease: "ease.Out"
    });
    // consider the oder of your delays when animating elements in 
    // gsap.from("#ele9", {
    //     duration: duration,
    //     delay: delay + 0.75,
    //     left: -200,
    //     //power3.out is usually for sliding in, its opposite...
    //     ease: "power3.out"
    // });

    // gsap.from("#ele10", {
    //     duration: duration,
    //     delay: delay + 0.25,
    //     left: -200,
    //     ease: "power3.out"
    // });

    // gsap.from("#ele11", {
    //     duration: duration,
    //     delay: delay + 0.75,
    //     bottom: -100,
    //     ease: "power3.out"
    // });

    // gsap.from("#ele12", {
    //     duration: duration,
    //     delay: delay + 1,
    //     bottom: -100,
    //     right: -100,
    //     ease: "power3.out"
    // });

    // reset bars on graph
    // $(".bars").css({height: 5});  
    // // click to execute multiple tweens 
    // $("#ele9").click(function(){

    //     gsap.fromTo("#bar1", {
    //         height: 5
    //     }, {
    //         duration: 1,
    //         height: 150,
    //         ease: "elastic.out"
    //     });

    //     gsap.fromTo("#bar2", {
    //         height: 5
    //     }, {
    //         duration: 1,
    //         height: 90,
    //         ease: "elastic.out"
    //     });

    //     gsap.fromTo("#bar3", {
    //         height: 5
    //     }, {
    //         duration: 1,
    //         height: 50,
    //         ease: "elastic.out"
    //     });

    //     gsap.fromTo("#bar4", {
    //         height: 5
    //     }, {
    //         duration: 1,
    //         height: 170,
    //         ease: "elastic.out"
    //     });

    //     gsap.fromTo("#bar5", {
    //         height: 5
    //     }, {
    //         duration: 1,
    //         height: 20,
    //         ease: "elastic.out"
    //     });
    // });
    
    
    // start voiceover
    gsap.delayedCall(delay + 3.5, loadScreenAudio);
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5() {
    // animate content on with delays
    gsap.from("#screen5 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.from("#ele22e", {
        duration: duration,
        delay: delay + 0.5,
        x:-250,
        ease: "ease.Out"
    });

    gsap.from("#ele23e", {
        duration: duration,
        delay: delay + 1,
        x:-250,
        ease: "ease.Out"
    });

    $("#imageB8").click(function(){
        gsap.to("#ele23img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele24e", {
        duration: duration,
        delay: delay + 1.5,
        x:-250,
        ease: "ease.Out"
    });

    $("#imageB9").click(function(){
        gsap.to("#ele24img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele25e", {
        duration: duration,
        delay: delay + 2,
        y:200,
        ease: "ease.Out"
    });

    gsap.from("#ele26e", {
        duration: duration,
        delay: delay + 2.5,
        x:250,
        ease: "ease.Out"
    });

    gsap.from("#ele27e", {
        duration: duration,
        delay: delay + 3,
        x:250,
        ease: "ease.Out"
    });

    $("#imageB10").click(function(){
        gsap.to("#ele27img", {opacity:1, ease:"ease.Out"});
    });

    gsap.from("#ele28e", {
        duration: duration,
        delay: delay + 3.5,
        x:250,
        ease: "ease.Out"
    });
    
    // gsap.from("#ele13", {
    //     duration: duration,
    //     delay: delay + 0.5,
    //     left: -200,
    //     //power3.out is usually for sliding in, its opposite...
    //     ease: "power3.out"
    // });

    // gsap.from("#ele14", {
    //     duration: duration,
    //     delay: delay + 0.5,
    //     right: -200,
    //     //power3.out is usually for sliding in, its opposite...
    //     ease: "power3.out"
    // });

    // //click to view overlay content
    // $("#ele13").click(function(){
    //     //fade in our content
    //     $("#ele13content").show();

    //     gsap.fromTo("#ele13content", {
    //         opacity: 0
    //     }, {
    //         opacity: 1,
    //         duration: 0.5
    //     });
    // });

    //  //click to view overlay content
    //  $("#ele14").click(function(){
    //     //fade in our content
    //     $("#ele14content").show();

    //     gsap.fromTo("#ele14content", {
    //         opacity: 0
    //     }, {
    //         opacity: 1,
    //         duration: 0.5
    //     });
    // });

    // //close overlay content
    // $(".close").click(function(){
    //     let thisParent = $(this).parent();

    //     //animate it
    //     gsap.to(thisParent, {
    //         duration: 0.5,
    //         opacity: 0,

    //         onComplete: function(){
    //             thisParent.hide();
    //         }
    //     });
    // });
    
    
    // start voiceover
    gsap.delayedCall(delay + 3.5, loadScreenAudio);
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6() {
    // animate content on with delays
    gsap.from("#screen6 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });

    gsap.fromTo("#ele15", {
        rotation: -45
    }, {
        duration: duration,
        delay: delay + 1,
        rotation: 45,
        ease: "power2.inOut",
        repeat: -1,   //do it forever loop
        yoyo: "true"  //smooth the forever looping
    });

    gsap.from("#ele15", {
        duration: duration,
        delay: delay + duration,
        opacity: 0
    });
}