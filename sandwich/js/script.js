window.onload = function(){
    //sandwich reference
    let mySandwich = document.getElementById('sandwich').contentDocument;
    let BunB = mySandwich.getElementById('bunBottom');
    let Mayo = mySandwich.getElementById('mayo');
    let Ham = mySandwich.getElementById('prosciutto');
    let Tomato = mySandwich.getElementById('tomato');
    let Lettuce = mySandwich.getElementById('lettuce');
    let Ketchup = mySandwich.getElementById('ketchup');
    let BunT = mySandwich.getElementById('bunTop');
    //infographic 1 reference
    let theInfo1 = document.getElementById('info1').contentDocument;
    // let aPopulation = theInfo1.getElementById('population1');
    let aFlag = theInfo1.getElementById('flag1');
    // let aPerson = theInfo1.getElementById('person1');
    // let aBillion = theInfo1.getElementById('billion1');
    // let aSnum = theInfo1.getElementById('Snum');
    //infographic 2 reference
    let theInfo2 = document.getElementById('info2').contentDocument;
    let theFlag = theInfo2.getElementById('ukflag');
    //sandwisc animation
    gsap.to(BunB, {x:"+=80", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(Mayo, {x:"+=50", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(Ham, {x:"+=80", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(Tomato, {x:"+=50", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(Lettuce, {x:"+=80", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(Ketchup, {x:"+=50", yoyo:true, repeat:-1, duration:2, ease:'none'});
    gsap.to(BunT, {x:"+=80", yoyo:true, repeat:-1, duration:2, ease:'none'});
    //infographic 1 animation
    gsap.to(aFlag, {scaleX:"+=0.2", yoyo:true, repeat:-1, duration:2, ease:'none'});
    //infographic 2 animation
    gsap.from(theFlag, {scaleY:"+=0.1", yoyo:true, repeat:-1, duration:2, ease:'none'});


    gsap.registerPlugin(TextPlugin);

    let myBunB = mySandwich.querySelector("#bunBottom");

    myBunB.addEventListener("click", event => {
        console.log('clicked');
        // gsap.to("p", {duration: 1, text: "Spaccatella Bun"})
        gsap.to(".cal", {duration: 1, text: "280", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "1.5g"})
        gsap.to(".pro", {duration: 1, text: "11g", color:"#cd212a"})
    });

    let myMayo = mySandwich.querySelector("#mayo");

    myMayo.addEventListener("click", event => {
        console.log('clicked');
        // gsap.to("p", {duration: 1, text: "Mayonnies"})
        gsap.to(".cal", {duration: 1, text: "100", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "11g"})
        gsap.to(".pro", {duration: 1, text: "0.1g", color:"#cd212a"})
    });

    let myHam = mySandwich.querySelector("#prosciutto");

    myHam.addEventListener("click", event => {
        console.log('clicked');
        gsap.to(".cal", {duration: 1, text: "80", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "4.5g"})
        gsap.to(".pro", {duration: 1, text: "8g", color:"#cd212a"})
    });

    let myTomato = mySandwich.querySelector("#tomato");

    myTomato.addEventListener("click", event => {
        console.log('clicked');
        gsap.to(".cal", {duration: 1, text: "16", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "0.2g"})
        gsap.to(".pro", {duration: 1, text: "0.8g", color:"#cd212a"})
    });

    let myLettuce = mySandwich.querySelector("#lettuce");

    myLettuce.addEventListener("click", event => {
        console.log('clicked');
        gsap.to(".cal", {duration: 1, text: "15", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "0.2g"})
        gsap.to(".pro", {duration: 1, text: "1.4g", color:"#cd212a"})
    });

    let myKetchup = mySandwich.querySelector("#ketchup");

    myKetchup.addEventListener("click", event => {
        console.log('clicked');
        gsap.to(".cal", {duration: 1, text: "20", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "0g"})
        gsap.to(".pro", {duration: 1, text: "0.3g", color:"#cd212a"})
    });

    let myBunT = mySandwich.querySelector("#bunTop");

    myBunT.addEventListener("click", event => {
        console.log('clicked');
        gsap.to(".cal", {duration: 1, text: "280", color: "#008c45"})
        gsap.to(".fat", {duration: 1, text: "1.5g"})
        gsap.to(".pro", {duration: 1, text: "11g", color:"#cd212a"})
    });
    
}

// get text of element
// var content = element.innerHTML;

// set text of element
// element.innerHTML = content;