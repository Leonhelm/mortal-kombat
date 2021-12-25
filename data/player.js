import {
  PLAYER_LIST_URL,
  PLAYER_CHOOSE_URL,
  PLAYER_FIGHT_URL,
} from "../constants.js";
import fetchJson from "../utils/fetchJson.js";

export const getPlayerList = () => fetchJson(PLAYER_LIST_URL);

export const choosePlayer = () => fetchJson(PLAYER_CHOOSE_URL);

export const fightPlayer = (attack) => {
  const { hit, defence } = attack;
  return fetchJson(PLAYER_FIGHT_URL, {
    method: "POST",
    body: JSON.stringify({ hit, defence }),
  });
};
