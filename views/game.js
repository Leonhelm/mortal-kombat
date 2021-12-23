import { CHARACTERS } from "../constants.js";
import { createPlayer } from "../domains/player.js";
import { enemyAttack } from "../domains/enemy.js";
import {
  $controlForm,
  playerAttack,
  renderPlayer,
  renderReloadButton,
  disableControlFormSubmitButton,
  renderRoundDraw,
  renderWins,
  changePlayerHp,
} from "./arenas.js";
import { generateLogs } from "./chat.js";

export class Game {
  constructor() {
    this.scorpion = createPlayer(CHARACTERS.scorpion);
    this.subZero = createPlayer(CHARACTERS.subZero);
  }

  start = () => {
    renderPlayer(this.scorpion);
    renderPlayer(this.subZero);
    generateLogs("start", { player1: this.subZero, player2: this.scorpion });

    $controlForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const scorpionAttack = playerAttack();
      const subZeroAttack = enemyAttack();
      $controlForm.reset();

      if (scorpionAttack.hit === subZeroAttack.defence) {
        generateLogs("defence", {
          player1: this.scorpion,
          player2: this.subZero,
        });
      } else {
        this.subZero.changeHP(scorpionAttack.value);
        changePlayerHp(this.subZero);
        generateLogs("hit", {
          player1: this.scorpion,
          player2: this.subZero,
          attackValue: scorpionAttack.value,
        });
      }

      if (subZeroAttack.hit === scorpionAttack.defence) {
        generateLogs("defence", {
          player1: this.subZero,
          player2: this.scorpion,
        });
      } else {
        this.scorpion.changeHP(subZeroAttack.value);
        changePlayerHp(this.scorpion);
        generateLogs("hit", {
          player1: this.subZero,
          player2: this.scorpion,
          attackValue: subZeroAttack.value,
        });
      }

      this.#showResult();
    });
  };

  #showResult = () => {
    const isScorpionLose = this.scorpion.hasLose();
    const isSubZeroLose = this.subZero.hasLose();

    if (isScorpionLose || isSubZeroLose) {
      if (isScorpionLose && isSubZeroLose) {
        renderRoundDraw();
        generateLogs("draw");
      } else if (isScorpionLose) {
        renderWins(this.subZero.name);
        generateLogs("end", { player1: this.subZero, player2: this.scorpion });
      } else if (isSubZeroLose) {
        renderWins(this.scorpion.name);
        generateLogs("end", { player1: this.scorpion, player2: this.subZero });
      }

      disableControlFormSubmitButton();
      renderReloadButton();
    }
  };
}
