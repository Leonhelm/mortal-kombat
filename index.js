import { ARENA_ROUTE } from "./constants.js";
import createElement from "./utils/createElement.js";
import {
  getPlayerList,
  getPlayerAvatar,
  setPlayerToLocalStorage,
} from "./data/player.js";

const $parent = document.querySelector(".parent");
const $player = document.querySelector(".player");

function createEmptyPlayerBlock() {
  const el = createElement("div", ["character", "div11", "disabled"]);
  const img = createElement("img");
  img.src = getPlayerAvatar("11.png");
  el.appendChild(img);
  $parent.appendChild(el);
}

async function init() {
  localStorage.removeItem("player1");

  const players = await getPlayerList();

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach((item) => {
    const el = createElement("div", ["character", `div${item.id}`]);
    const img = createElement("img");

    el.addEventListener("mousemove", () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement("img");
        $img.src = imgSrc;
        $player.appendChild($img);
      }
    });

    el.addEventListener("mouseout", () => {
      if (imgSrc) {
        imgSrc = null;
        $player.innerHTML = "";
      }
    });

    el.addEventListener("click", () => {
      setPlayerToLocalStorage("player1", item);

      $parent.querySelector(".character.active")?.classList.remove("active");
      el.classList.add("active");

      setTimeout(() => {
        window.location.pathname = ARENA_ROUTE;
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    $parent.appendChild(el);
  });
}

init();
