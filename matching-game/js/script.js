// Amardeep Jhas
//100773775
// matching card game

window.onload = function() {
    // refrence splash if you have animation
    let mySplash = document.getElementById('splashpage').contentDocument;
    let myLetters = mySplash.getElementsByClassName('letters');
    // let theLines = mySplash.getElementsByClassName('lines');
    let Line1 = mySplash.getElementById('bottomline');
    // buttons
    let myObj = document.getElementById('obj').contentDocument;
    let TheButtons = myObj.getElementsByClassName('btns');
    //reference the  game board
    let theBoard = document.querySelector('.gameBoard');
    //reference the card
    let theCard = document.querySelector('.card');
    let theBack = '';
    //varieble set up
    let uniqueCard = 8;
    let totalCards = uniqueCard * 2;
    // 2 arrays for 2 deck
    const deckA = ['./img/deckA/card01.svg','./img/deckA/card02.svg', './img/deckA/card03.svg', './img/deckA/card04.svg', './img/deckA/card05.svg', './img/deckA/card06.svg', './img/deckA/card07.svg', './img/deckA/card08.svg'];
    const deckB = ['./img/deckB/card01.svg','./img/deckB/card02.svg', './img/deckB/card03.svg','./img/deckB/card04.svg','./img/deckB/card05.svg', './img/deckB/card06.svg', './img/deckB/card07.svg', './img/deckB/card08.svg'];
    //variable for new deck
    let newDeck =[];
    let deckX = [];
    //variables to keep specific index id animation 
    //related to first card and second card
    let firstCard = secondCard = null;
    let firstId = secondId = null;
    let firstAnimation = secondAnimation = null;
    let totalMatch = 0;
    // timeline animation for winning
    let winAnimation = gsap.timeline({paused: true});
    //change this animation
    winAnimation.to('#win',{autoAlpha:1})
    .from('#win', {y:-400, duration:3})
    // .to('#win', {scale:4, duration: 1})
    // .to('#win', {autoAlpha:0},'-=.8')
    .to('#win', {autoAlpha:0, duration:2})
    .to('#obj', {autoAlpha:1}); //going back to buttons

    // slapsh animation
    let splashAnimation = gsap.timeline();
    //splashAnimation.from(mySplash, {opacity:0, duration: 1.5}) if animation happening
    splashAnimation.from(myLetters,{y:-400, duration: 3})
    .to(myLetters,{duration:4})
    .to("#splashpage",{autoAlpha:0, y:160, duration:1})
    .to('#obj',{autoAlpha: 1});
    

    //clone the class card in html
        function cloneCards(){
            for (let i=0; i<totalCards; i++){
                let clone = theCard.cloneNode(true);
                theBoard.appendChild(clone);
            }
            //remove the first item in class card
            let elements = document.getElementsByClassName('card');
            elements[0].parentNode.removeChild(elements[0]);
        }

        // user choose a deck
        gsap.utils.toArray(TheButtons).forEach(function(btn, index){
            btn.addEventListener('click', function(){
                if (index === 0){
                    deckX = deckA.slice(0,deckA.length).concat(deckA.slice(0,deckA.length));
                    theBack = './img/deckA/card00.svg';
                    uniqueCard = deckA.length;
               } else {
                    deckX = deckB.slice(0,deckB.length).concat(deckB.slice(0,deckB.length));
                    theBack = './img/deckB/card00.svg';
                    uniqueCard = deckB.length;
               }
               totalCards = uniqueCard * 2;
               cloneCards();
               setUpGame();
            })
        })
    //game setup
    function setUpGame(){
        //remove buttons
        gsap.to('#obj',{autoAlpha: 0});
        //shuffle cards
        for(var i=0; i<totalCards; i++){
            let randNum = Math.floor(Math.random()*deckX.length);
            newDeck[i] = deckX[randNum];
            deckX.splice(randNum, 1);
        }
        // console.log('--AFTER---->'+newDeck);
        let deckOfCard = gsap.utils.toArray('.card > .faces');
        //each deck have an array
        deckOfCard.forEach(function(card,index){
            let newId = 'img' + (index + 1);
            document.getElementById('imgX').id = newId;
            //place graphic
            document.getElementById(newId).src = newDeck[index];
            // back cover
            let backId = 'bk' + (index+1);
            document.getElementById('bk').id = backId;
            document.getElementById(backId).src = theBack;


            card.index = index;
            card.id = newId;
            //time line for flipping 
            let animation = gsap.timeline({paused: true});
            animation.fromTo(card, {rotationY:180},{rotationY:0});
            card.animation = animation;
            //click event
            card.addEventListener('click',flipCard);
        
        })

        // reveal the card
        gsap.set(theBoard, {autoAlpha: 1});
    }
    // function flipCard with this we save the flipped card
    function flipCard(){
        if(firstCard === null){
            firstCard = this.index;
            firstId = this.id;
            firstAnimation = this.animation;
            this.animation.play();
        } else if (secondCard === null && this.id != firstId){
            secondCard = this.index;
            secondId = this.id;
            secondAnimation = this.animation;
            this.animation.play();
            //checking the pair hold the cards and timeout to flip back
            setTimeout(function(){
                if(newDeck[firstCard] === newDeck[secondCard]){
                    // animation for matching cards
                    let id_one = '#'+firstId;
                    let id_two = '#'+secondId;
                    gsap.to([id_one, id_two], {autoAlpha:0, scale:2, scale:-1});
                    totalMatch ++;//increment the count for match
                    // check the total match
                    if(totalMatch === uniqueCard) {
                        //do animation
                        
                        //reset all variables
                        totalMatch = 0;
                        firstCard = secondCArd = null;
                        firstId = secondId = null;
                        firstAniamtion = secondAnimation = null;
                        deckX = newDeck =[];
                        //remove all cloned cards
                        removeCloning();
                        //playing the win animation
                        winAnimation.restart();
                    }
                }
                else {
                    firstAnimation.reverse();
                    secondAnimation.reverse();
                }
                firstCard = secondCard = null;
            }, 1000);

        }
    }
    function removeCloning(){
        let elements = document.getElementsByClassName('card');
        //reset the fisrt item in card to imgX and src
        document.getElementsByTagName('img')[0].setAttribute('id','imgX');
        document.getElementsByTagName('img')[1].setAttribute('id','bk');
        document.getElementById('imgX').setAttribute('src', './img/deckA/card01.svg');
        //remove all others
        while(elements.length > 1){
            elements[1].parentNode.removeChild(elements[1]);
        }
        gsap.set(theBoard, {autoAlpha:0});

    }
}