"use strict";

const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const scorpion = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const subZero = {
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

function createElement(tagName, className) {
  const $element = document.createElement(tagName);

  if (className) {
    $element.classList.add(className);
  }

  return $element;
}

function createPlayer(player) {
  const $player = createElement("div", `player${player.player}`);
  const $progressbar = createElement("div", "progressbar");
  const $playerLife = createElement("div", "life");
  const $playerName = createElement("div", "name");
  const $character = createElement("div", "character");
  const $characterImage = createElement("img");

  $playerLife.style.width = `${player.hp}%`;
  $playerName.innerText = player.name;
  $characterImage.src = player.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($playerLife);
  $progressbar.appendChild($playerName);
  $character.appendChild($characterImage);

  return $player;
}

function createWinsTitle(title) {
  const $winsTitle = createElement("div", "winsTitle");
  $winsTitle.innerText = title;

  return $winsTitle;
}

function playerWins(name) {
  return createWinsTitle(`${name} wins`);
}

function roundDraw() {
  return createWinsTitle(`Round draw`);
}

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  const damage = Math.ceil(Math.random() * 20);
  const hpAfter = player.hp - damage;

  player.hp = hpAfter < 0 ? 0 : hpAfter;
  $playerLife.style.width = `${player.hp}%`;
}
// round draw
function checkWinner(player1, player2) {
  const player1Lose = player1.hp <= 0;
  const player2Lose = player2.hp <= 0;

  if (player1Lose && player2Lose) {
    $arenas.appendChild(roundDraw());
  } else if (player1Lose) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2Lose) {
    $arenas.appendChild(playerWins(player1.name));
  }
}

function disableRandomButton(player1, player2) {
  if (player1.hp <= 0 || player2.hp <= 0) {
    $randomButton.disabled = true;
  }
}

$randomButton.addEventListener("click", function () {
  changeHP(scorpion);
  changeHP(subZero);
  checkWinner(scorpion, subZero);
  disableRandomButton(scorpion, subZero);
});

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subZero));
