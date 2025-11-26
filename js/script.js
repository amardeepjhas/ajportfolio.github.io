const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownCaret = document.querySelector(".arrow1");
const dropdownContent = document.querySelector(".dropdown-content");

// add click event to dropdown button
dropdownBtn.addEventListener("click", () => {
  // add rotate to caret element
  dropdownCaret.classList.toggle("arrow-rotate");
  // add open styles to menu element
  dropdownContent.classList.toggle("menu-open");
  dropdownBtn.setAttribute(
    "aria-expanded",
    dropdownBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

window.onload = function() {
  // reference the header svg aniamtion
  let Hero = document.getElementById('header').contentDocument;
  let Logo = Hero.getElementById('logo');
  let h2 = Hero.getElementById('IMDtext');
  let flower1 = Hero.getElementById('one');
  let flower2 = Hero.getElementById('two');
  let flower3 = Hero.getElementById('three');
  let flower4 = Hero.getElementById('four');
  let theFlowers = Hero.getElementsByClassName('flowerAnim');

  //section aniamtions
  let About = document.getElementsByClassName('aboutt');
  let paragraph = document.getElementsByClassName('aboutp');
  let Work = document.getElementsByClassName('worktitle');
  let Box = document.getElementsByClassName('box');

    // logo animation of header section
  let logoAnimation = gsap.timeline();

    logoAnimation.from(Logo,{y:50, opacity:0, duration:1})
    .to(Logo, {
      duration: 2.5,
      ease: 'elastic.out(1.0,0.3)',
      y: -2
    });

  let IMDh2 = gsap.timeline();
    // IMD text h2 in header animation
    IMDh2.from(h2,{y:-20,opacity:0, duration: 2, delay:0.8});
    

    
    gsap.from(theFlowers, {
      stagger: 0.5, 
      duration: 0.8, 
      scale: 0
    });


    gsap.utils.toArray(theFlowers).forEach(flower => {
      flower.addEventListener('mouseenter', function(){
        gsap.to(flower, {rotation:360});
      });
      flower.addEventListener('mouseleave', function(){
        gsap.to(flower, {rotation:-360});
      });
    });

gsap.registerPlugin('scrollTrigger');


gsap.from(theFlowers, {
      y:100,
      opacity: 0,
      scrollTrigger: {
        trigger: ".header",
        start: "top 70%",
        end: "bottom 80%",
        // markers: true,
        toggleActions: "restart pause resume reverse"
      }
    });

    gsap.from(About, {
      x:-100,
      opacity: 0,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "bottom 100%",
        // markers: true,
        toggleActions: "restart pause resume reverse"
      }
    });
    gsap.from(paragraph, {
      x:-100,
      opacity: 0,
      scrollTrigger: {
        trigger: ".about",
        start: "top 40%",
        end: "bottom 100%",
        // markers: true,
        toggleActions: "restart pause resume reverse"
      }
    });
    gsap.from(Work, {
      x:-100,
      scrollTrigger: {
        trigger: ".work",
        start: "top 80%",
        end: "bottom 100%",
        // markers: true,
        toggleActions: "restart pause resume reverse"
      }
    });

    gsap.from(Box, {
      x:-100,
      stagger: .2,
      opacity: 0,
      ease: 'bounce',
      scrollTrigger: {
        trigger: ".work",
        start: "top 40%",
        end: "bottom 100%",
        // markers: true,
        toggleActions: "restart pause resume reverse"
      }
    });

}