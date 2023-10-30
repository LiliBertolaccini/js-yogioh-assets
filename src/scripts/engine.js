const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
    //(property) button: HTMLElement | null
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
  //cardImages: {
  //  playerCardImg: '',
  //  computerCardImg: '',
  //},
};


playerSides = {
  player1: "player-cards",
  computer: "computer-cards",
};

//enumeração das cartas
  const pathImages = "./src/assets/icons/";
  const cardData = [
    {
      id: 0,
      name: "Blue Eye White Dragon",
      type: "Paper",
      //img: ".src/assets/icons/dragon.png",
      img: `${pathImages}dragon.png`,
      WinOf: [1],
      LoseOf: [2],
    },
    {
      id: 1,
      name: "Dark Magician",
      type: "Rock",
      img: `${pathImages}magician.png`,
      WinOf: [2],
      LoseOf: [0],
    },
    {
      id: 2,
      name: "Exodia",
      type: "Scissors",
      img: `${pathImages}exodia.png`,
      WinOf: [0],
      LoseOf: [1],
    },
  ]

//id aleátorio
async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}


//setando atribundos para cards
    //async function createCardImage(IdCard, fieldSide) {
    //  const cardImage = document.createElement("img");
    //  cardImage.setAttribute("height", "100px");
    //  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    //  cardImage.setAttribute("data-id", IdCard);
    //  cardImage.classList.add("card");

    //  if(fieldSide === playerSides.player1) {
    //    cardImage.addEventListener("mouseover", () => {
    //      drawSelectedCard(IdCard);
    //    });

    //    cardImage.addEventListener("click", () => {
    //      setCardsField(IdCard.getAttribute("data-id"));
    //    });

    //    return cardImage;
    //  }


    async function createCardImage(cardId, fieldSide) {
      const cardImage = document.createElement("img");
      
      cardImage.setAttribute("height", "100px");
      cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
      cardImage.setAttribute("data-id", cardId);
      cardImage.classList.add("card");
      
      cardImage.addEventListener("mouseover", () => {
        drawSelectedCard(cardId);
      });
      
      cardImage.addEventListener("click", function() {
        setCardsField(this.getAttribute("data-id"), fieldSide);
      });
      
      return cardImage;
    }
    
    async function setCardsField(cardId) {
      // Remova todas as cartas antes
      await removeAllCardsImage();
    
      // Obtenha o ID da carta do computador
      let computerCardId = await getRandomCardId();
    
      state.fieldCards.player.style.display = "block";
      state.fieldCards.computer.style.display = "block";
      
      // Obtenha as imagens das cartas
      const cardImagePlayer = cardData[cardId].img;
      const cardImageComputer = cardData[computerCardId].img;

      // Exiba as imagens das cartas no campo
      state.fieldCards.player.src = cardImagePlayer;
      state.fieldCards.computer.src = cardImageComputer;

      state.cardSprites.name = "";
      state.cardSprites.type = "";
    
      // Verifique o vencedor do duelo e atualize a pontuação
      let duelResult = await checkDuelResult(cardId, computerCardId);
      await updateScore();
      await drawButton(duelResult);
    }

    async function drawButton(duelResult) {
      // Exibir o botão de próximo duelo
      state.actions.button.style.display = "block";
      state.actions.button.innerText = duelResult;
    }

    async function updateScore() {
      state.score.scoreBox.innerText = `Win ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
    }


    async function checkDuelResult(cardId, computerCardId) {
      // Obtém as cartas do jogador e do computador
      let playerCard = cardData[cardId];
      let computerCard = cardData[computerCardId];
    
      if (playerCard.WinOf.includes(computerCardId)) {
        // Se o jogador vencer, retornar a mensagem "Player venceu"
        state.score.playerScore++;
        await playAudio("win");
        return "Player venceu";
      } else if (playerCard.LoseOf.includes(computerCardId)) {
        // Se o computador vencer, retornar a mensagem "Computer venceu"
        state.score.computerScore++;
        await playAudio("lose");
        return "Computer venceu";
      } else {
        // Se for um empate, retorne "Empate"
        return "Empate";
      }
    }

    //async function checkDuelResult(playerCardId, ComputerCardId) {
    //  let duelResults = "Draw";
    //  let playerCard = cardData[playerCardId];
    //  //let playerCard = cardData[cardId];
    
    //  if (playerCard.WinOf.includes(ComputerCardId)) {
    //    duelResult = "win";
    //    state.score.playerScore++;
    //  }
    //  if (playerCard.LoseOf.includes(ComputerCardId)) {
    //    duelResult = "lose";
    //    state.score.computerScore++;
    //  }
    //await playAudio(duelResults);
    //  return duelResult;
    //}



    async function removeAllCardsImage() {
      // Remova todas as cartas da área de jogo
      state.fieldCards.player.src = "";
      state.fieldCards.computer.src = "";
    }
    
    async function removeAllCards() {
      const playerCardContainer = document.getElementById(playerSides.player1);
      const computerCardContainer = document.getElementById(playerSides.computer);
    
      playerCardContainer.innerHTML = "";
      computerCardContainer.innerHTML = "";
    }


async function drawSelectedCard(index) {
  state.cardSprites.avatar.setAttribute("src", cardData[index].img);
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}


      // primeiro pensa no que quer, na loa logica, depis vc faz. 
      // se vai gerar uma carta aleátoria, ela precisa de imagem.
      async function drawCards(cardNumbers, fieldSide) {
        for (let i = 0; i < cardNumbers; i++) {
          const cardId = await getRandomCardId();
          const cardImage = await createCardImage(cardId, fieldSide);
      
          if (fieldSide === playerSides.player1) {
            // Adicione eventos apenas para o jogador
            cardImage.addEventListener("mouseover", function() {
              this.classList.remove("hidden-card");
            });
      
            cardImage.addEventListener("mouseout", function() {
              this.classList.add("hidden-card");
            });
      
            cardImage.addEventListener("click", function() {
              setCardsField(this.getAttribute("data-id"), fieldSide);
            });
          } else {
            // Adicione classe "hidden-card" para cartas do computador
            cardImage.classList.add("hidden-card");
          }
      
          document.getElementById(fieldSide).appendChild(cardImage);
        }
      }



async function resetDuel() {
  // Exibir o botão de próximo duelo
  state.actions.button.style.display = "block";

  // Remova todas as cartas no campo
  removeAllCardsImage();

  // Zerar a pontuação
  state.score.playerScore = 0;
  state.score.computerScore = 0;
  state.score.scoreBox.innerText = "Win 0 | Lose: 0";

  // Remova todas as cartas existentes
  removeAllCards();

  init();
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  
  audio.play();
  //try {
  //  await audio.play();
  //}catch{
  //}
}

//state.cardSprites.name <- para recuperar esse carinha na função inicial usando atraves de dot notation, para acessar o objeto no estado.
function init() {
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);

  const bgm = document.getElementById("bgm");
  const audioToggle = document.getElementById("audio-toggle");
let isAudioOn = true;

audioToggle.addEventListener("click", () => {
  if (isAudioOn) {
    bgm.pause();
    isAudioOn = false;
    audioToggle.innerText = "Audio On";
  } else {
    bgm.play();
    isAudioOn = true;
    audioToggle.innerText = "Audio Off";
  }
});
}

init()
