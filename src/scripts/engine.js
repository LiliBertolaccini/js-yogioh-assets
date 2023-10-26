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
};

playerSides = {
  player1: "player-field-card",
  computer: "computer-field-card",
};

//enumeração das cartas
  const pathImages = ".src/assets/icons/";
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


//regra do jokepo, da pra alterar! tem 3 cards, um ganha eum e perde de outro,igual é empate.

      //enuns
      //const players = {
      //  player: "player",
      //}

// setando atribundos para cards
async function createCardImage(IdCard, fieldSide) {
  const cardImage = documet.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", ".src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");

if(fieldSide === playerSides.player1) {
  cardImage.addEventListener("click", () => {
    setCardsField(IdCard.getAttribute("data-id"));
  });
}

cardImage.addEventListener("mouseover", () => {
  drawSelectedCard(IdCard);
});

return cardImage;

}


      // primeiro pensa no que quer, na loa logica, depis vc faz. 
      // se vai gerar uma carta aleátoria, ela precisa de imagem.

  async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
      const randomIdCard = await getRandomCardId();
      const cardImage = await createCardImage(randomIdCard, fieldSide);

      document.getElementById(fieldSide).appendChild(cardImage);
    }
  }


//state.cardSprites.name <- para recuperar esse carinha na função inicial usando atraves de dot notation, para acessar o objeto no estado.
function init() {
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);
}

init();