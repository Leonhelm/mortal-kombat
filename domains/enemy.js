import { HIT, ATTACK } from "../constants.js";
import getRandom from "../utils/getRandom.js";

export const enemyAttack = () => {
  const hit = ATTACK[getRandom(0, 2)];
  const defence = ATTACK[getRandom(0, 2)];
  return {
    value: HIT[hit],
    hit,
    defence,
  };
};
