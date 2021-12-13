"use strict";

const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const scorpion = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  changeHP,
  elHP,
  renderHP,
  renderWins,
};

const subZero = {
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  changeHP,
  elHP,
  renderHP,
  renderWins,
};

function changeHP(damage) {
  const hpAfter = this.hp - damage;
  this.hp = hpAfter < 0 ? 0 : hpAfter;
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

function renderWins() {
  return createWinsTitle(`${this.name} wins`);
}

$randomButton.addEventListener("click", function () {
  const players = [scorpion, subZero];

  const playersLose = players.map((player) => {
    player.changeHP(getRandom(20));
    player.renderHP();
    return hasPlayerLose(player);
  });

  if (playersLose.some(Boolean)) {
    if (playersLose.every(Boolean)) {
      $arenas.appendChild(roundDraw());
    } else if (playersLose[0]) {
      $arenas.appendChild(players[1].renderWins());
    } else if (playersLose[1]) {
      $arenas.appendChild(players[0].renderWins());
    }

    disableRandomButton();
    $arenas.appendChild(createReloadButton());
  }
});

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subZero));

function hasPlayerLose(player) {
  return player.hp <= 0;
}

function disableRandomButton() {
  $randomButton.disabled = true;
}

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "Restart";
  $reloadWrap.appendChild($reloadButton);

  $reloadButton.addEventListener("click", () => {
    window.location.reload();
  });

  return $reloadWrap;
}

function roundDraw() {
  return createWinsTitle(`Round draw`);
}

function createWinsTitle(title) {
  const $winsTitle = createElement("div", "winsTitle");
  $winsTitle.innerText = title;
  return $winsTitle;
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

function createElement(tagName, className) {
  const $element = document.createElement(tagName);

  if (className) {
    $element.classList.add(className);
  }

  return $element;
}

function getRandom(maxValue) {
  return Math.ceil(Math.random() * maxValue);
}
