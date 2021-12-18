"use strict";

const HIT = {
  head: getRandom(20, 30),
  body: getRandom(20, 30),
  foot: getRandom(20, 30),
};
const ATTACK = ["head", "body", "foot"];

const LOGS = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

const $arenas = document.querySelector(".arenas");
const $controlForm = document.querySelector("form.control");
const $controlFormSubmitButton = $controlForm.querySelector(
  'button[type="submit"]'
);
const $chat = document.querySelector(".chat");

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

$controlForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const $form = e.target;
  const scorpionAttack = playerAttack($form);
  const subZeroAttack = enemyAttack();
  $form.reset();

  if (scorpionAttack.hit === subZeroAttack.defence) {
    generateLogs("defence", scorpion, subZero);
  } else {
    subZero.changeHP(scorpionAttack.value);
    subZero.renderHP();
    generateLogs("hit", scorpion, subZero);
  }

  if (subZeroAttack.hit === scorpionAttack.defence) {
    generateLogs("defence", subZero, scorpion);
  } else {
    scorpion.changeHP(subZeroAttack.value);
    scorpion.renderHP();
    generateLogs("hit", subZero, scorpion);
  }

  showResult();
});

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subZero));
generateLogs("start", subZero, scorpion);

function generateLogs(type, player1, player2) {
  const logText = makeLog(type, player1, player2);
  const el = `<p>${logText}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}

function makeLog(type, player1, player2) {
  const logType = LOGS[type];
  const text = Array.isArray(logType)
    ? logType[getRandom(0, logType.length - 1)]
    : logType;

  switch (type) {
    case "start":
      return text
        .replace("[time]", formatTime(new Date()))
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
    case "end":
      return text
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
    case "hit":
      return text
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
    case "defence":
      return text
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
    case "draw":
      return text;
    default:
      throw new Error('Argument "type" is defined incorrectly');
  }
}

function showResult() {
  const isScorpionLose = scorpion.hp <= 0;
  const isSubZeroLose = subZero.hp <= 0;

  if (isScorpionLose || isSubZeroLose) {
    if (isScorpionLose && isSubZeroLose) {
      $arenas.appendChild(roundDraw());
      generateLogs("draw");
    } else if (isScorpionLose) {
      $arenas.appendChild(subZero.renderWins());
      generateLogs("end", subZero, scorpion);
    } else if (isSubZeroLose) {
      $arenas.appendChild(scorpion.renderWins());
      generateLogs("end", scorpion, subZero);
    }

    disableControlFormSubmitButton();
    $arenas.appendChild(createReloadButton());
  }
}

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

function formatTime(date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${hours}:${minutes}`;
}
