import { HIT } from "../constants.js";
import createElement from "../utils/createElement.js";

const $arenas = document.querySelector(".arenas");

export const $controlForm = $arenas.querySelector("form.control");

const $controlFormSubmitButton = $controlForm.querySelector(
  'button[type="submit"]'
);

export const playerAttack = () => {
  const result = {};

  for (const $formItem of $controlForm) {
    if ($formItem.type === "radio" && $formItem.checked) {
      result[$formItem.name] = $formItem.value;
    }
  }

  result.value = HIT[result.hit];
  return result;
};

const createPlayer = (player) => {
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
};

export const renderReloadButton = () => {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "Restart";
  $reloadWrap.appendChild($reloadButton);

  $reloadButton.addEventListener("click", () => {
    window.location.reload();
  });

  $arenas.appendChild($reloadWrap);
};

export const changePlayerHp = (player) => {
  const $hp = document.querySelector(`.player${player.player} .life`);
  $hp.style.width = `${player.hp}%`;
};

export const renderRoundDraw = () => {
  $arenas.appendChild(createWinsTitle(`Round draw`));
};

export const renderWins = (name) => {
  $arenas.appendChild(createWinsTitle(`${name} wins`));
};

const createWinsTitle = (title) => {
  const $winsTitle = createElement("div", "loseTitle");
  $winsTitle.innerText = title;
  return $winsTitle;
};

export const renderPlayer = (player) => {
  $arenas.appendChild(createPlayer(player));
};

export const disableControlFormSubmitButton = () => {
  $controlFormSubmitButton.disabled = true;
};
