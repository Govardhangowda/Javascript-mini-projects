 let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      loses: 0,
      ties: 0
   };

    function updatescoreelement(){
      document.querySelector('.js-score').innerHTML=`Wins:${score.wins} Loses:${score.loses} Ties:${score.ties}`;
      }
    updatescoreelement();
   
    
    console.log(JSON.parse(localStorage.getItem('score')));

    let isAutoPlaying=false;
    let intervalid;

    function autoplay(){
      if(isAutoPlaying===false){
        document.querySelector('.js-autoplay').innerHTML='Stop';
        intervalid= setInterval(function(){
        const playermove=pickcomputermove();
        determination(playermove);
      },1000);
      isAutoPlaying=true;
      } else{
        document.querySelector('.js-autoplay').innerHTML='Autoplay';
        clearInterval(intervalid);
        isAutoPlaying=false;
      }
      
    }

    document.querySelector('.js-rock-button').addEventListener('click',() => {
      determination('Rock');
    })

    document.querySelector('.js-scissors-button').addEventListener('click',() => {
      determination('Scissors');
    })

    document.querySelector('.js-paper-button').addEventListener('click',() => {
      determination('Paper');
    })

    document.querySelector('.js-reset').addEventListener('click',() =>{
      let select=false;
      const popup= document.querySelector('.popup');
      popup.innerHTML=`
      <p class="popup-text">Are you sure you want to reset the score?</p>
      <button class="popup-button js-yes">Yes</button>
      <button class="popup-button js-no">No</button>`

      popup.querySelector('.js-yes').addEventListener('click',()=>{
          score.wins=0;
          score.loses=0;
          score.ties=0;
          localStorage.removeItem('score');
          updatescoreelement();
          popup.innerHTML='';
      })
      
      popup.querySelector('.js-no').addEventListener('click',()=>{
        popup.innerHTML=''
      })
          
      
      
    })

    document.querySelector('.js-autoplay').addEventListener('click',() =>{
      autoplay();
    })
  



    document.body.addEventListener('keydown',(event) =>{
      if (event.key===('r')||event.key===('R')){
        determination('Rock');
      }else if(event.key===('s')||event.key===('S')){
        determination('Scissors');
      }else if(event.key===('p')||event.key===('P')){
        determination('Paper');
      }else if(event.key===('a')||event.key===('A')){
        autoplay();
      }else if(event.key===('0')){
      
          let select=false;
          const popup= document.querySelector('.popup');
          popup.innerHTML=`
          <p class="popup-text">Are you sure you want to reset the score?</p>
          <button class="popup-button js-yes">Yes</button>
          <button class="popup-button js-no">No</button>`

          popup.querySelector('.js-yes').addEventListener('click',()=>{
              score.wins=0;
              score.loses=0;
              score.ties=0;
              localStorage.removeItem('score');
              updatescoreelement();
              popup.innerHTML='';
          })
          
          popup.querySelector('.js-no').addEventListener('click',()=>{
            popup.innerHTML=''
          }) 
        }
        }
  );


    function determination(umove) {
      const cmove = pickcomputermove();  // declare once
      let result = '';                   // declare once

      if (umove === 'Scissors') {
        if (cmove === 'Rock') {
          result = 'You Lose';
        } else if (cmove === 'Paper') {
          result = 'You Win';
        } else {
          result = 'Tie';
        }
      } else if (umove === 'Paper') {
        if (cmove === 'Rock') {
          result = 'You Win';
        } else if (cmove === 'Paper') {
          result = 'Tie';
        } else {
          result = 'You Lose';
        }
      } else if (umove === 'Rock') {
        if (cmove === 'Rock') {
          result = 'Tie';
        } else if (cmove === 'Paper') {
          result = 'You Lose';
        } else {
          result = 'You Win';
        }
      }

      if(result === 'You Win'){
        score.wins++;
      }else if(result === 'You Lose'){
        score.loses++;
      }else{
        score.ties++;
      }

      localStorage.setItem('score',JSON.stringify(score));

      updatescoreelement();

      document.querySelector('.js-result').innerHTML=`${result}`;

      document.querySelector('.js-moves').innerHTML=`You 
    <img src="images/${umove}-emoji.png" class="move-icon" alt="">
    <img src="images/${cmove}-emoji.png"  class="move-icon" alt="">
    Computer`;

      
      
      
    }


    function pickcomputermove(){
      let computerMOve='';
      const randomNumber = Math.random();

      if(randomNumber>=0 && randomNumber<(1/3)){
        computerMOve='Rock';
      }
      else if(randomNumber>=(1/3) && randomNumber<(2/3))
      {
        computerMOve='Paper';
      } 
      else
      {
        computerMOve='Scissors';
      }
      return computerMOve;
    }
