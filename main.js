"use strict";

const $arenas = document.querySelector(".arenas");
const $controlForm = document.querySelector("form.control");
const $controlFormSubmitButton = $controlForm.querySelector(
  'button[type="submit"]'
);

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

const HIT = {
  head: getRandom(20, 30),
  body: getRandom(20, 30),
  foot: getRandom(20, 30),
};
const ATTACK = ["head", "body", "foot"];

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

$controlForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const $form = e.target;
  const scorpionAttack = playerAttack($form);
  const subZeroAttack = enemyAttack();
  $form.reset();

  if (scorpionAttack.hit !== subZeroAttack.defence) {
    subZero.changeHP(scorpionAttack.value);
    subZero.renderHP();
  }

  if (subZeroAttack.hit !== scorpionAttack.defence) {
    scorpion.changeHP(subZeroAttack.value);
    scorpion.renderHP();
  }

  const isScorpionLose = scorpion.hp <= 0;
  const isSubZeroLose = subZero.hp <= 0;

  if (isScorpionLose || isSubZeroLose) {
    if (isScorpionLose && isSubZeroLose) {
      $arenas.appendChild(roundDraw());
    } else if (isScorpionLose) {
      $arenas.appendChild(subZero.renderWins());
    } else if (isSubZeroLose) {
      $arenas.appendChild(scorpion.renderWins());
    }

    disableControlFormSubmitButton();
    $arenas.appendChild(createReloadButton());
  }
});

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subZero));

function playerAttack($form) {
  const playerAttackResult = {};

  for (const $formItem of $form) {
    if ($formItem.type === "radio" && $formItem.checked) {
      playerAttackResult[$formItem.name] = $formItem.value;
    }
  }

  playerAttackResult.value = HIT[playerAttackResult.hit];
  return playerAttackResult;
}

function enemyAttack() {
  const hit = ATTACK[getRandom(0, 2)];
  const defence = ATTACK[getRandom(0, 2)];
  return {
    value: HIT[hit],
    hit,
    defence,
  };
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

function disableControlFormSubmitButton() {
  $controlFormSubmitButton.disabled = true;
}

function roundDraw() {
  return createWinsTitle(`Round draw`);
}

function createWinsTitle(title) {
  const $winsTitle = createElement("div", "loseTitle");
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

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
