import {
  PLAYER_LIST_URL,
  PLAYER_CHOOSE_URL,
  PLAYER_FIGHT_URL,
  PLAYER_AVATAR,
} from "../constants.js";
import fetchJson from "../utils/fetchJson.js";

export const getPlayerList = () => fetchJson(PLAYER_LIST_URL);

export const choosePlayer = () => fetchJson(PLAYER_CHOOSE_URL);

export const getPlayerFromLocalStorage = (playerKey) => {
  try {
    return JSON.parse(localStorage.getItem(playerKey));
  } catch {
    return null;
  }
};

export const setPlayerToLocalStorage = (playerKey, player) => {
  localStorage.setItem(playerKey, JSON.stringify(player));
};

export const fightPlayer = (attack) => {
  const { hit, defence } = attack;
  return fetchJson(PLAYER_FIGHT_URL, {
    method: "POST",
    body: JSON.stringify({ hit, defence }),
  });
};

export const getPlayerAvatar = (avatarImage) =>
  PLAYER_AVATAR.replace(":avatarImage", avatarImage);
