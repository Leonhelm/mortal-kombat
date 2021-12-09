"use strict";

const scorpion = {
  name: "SCORPION",
  hp: 50,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const subZero = {
  name: "SUB-ZERO",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

function createPlayer(className, player) {
  const $player = document.createElement("div");
  $player.classList.add(className);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $playerLife = document.createElement("div");
  $playerLife.classList.add("life");
  $playerLife.style.width = `${player.hp}%`;

  const $playerName = document.createElement("div");
  $playerName.classList.add("name");
  $playerName.innerHTML = player.name;

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $characterImage = document.createElement("img");
  $characterImage.src = player.img;

  const $arenas = document.querySelector(".arenas");
  $arenas.appendChild($player);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($playerLife);
  $progressbar.appendChild($playerName);
  $character.appendChild($characterImage);
}

createPlayer("player1", scorpion);
createPlayer("player2", subZero);
