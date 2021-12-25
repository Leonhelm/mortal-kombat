import { createPlayer } from "../domains/player.js";
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
import { choosePlayer, fightPlayer } from "../data/player.js";

export class Game {
  start = async () => {
    const [player1, player2] = await Promise.all([
      choosePlayer(),
      choosePlayer(),
    ]);

    this.player1 = createPlayer({
      ...player1,
      player: 1,
    });
    this.player2 = createPlayer({
      ...player2,
      player: 2,
    });

    renderPlayer(this.player1);
    renderPlayer(this.player2);
    generateLogs("start", { player1: this.player2, player2: this.player1 });

    $controlForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const attack = playerAttack();
      const { player1: player1Attack, player2: player2Attack } =
        await fightPlayer(attack);

      if (player1Attack.hit === player2Attack.defence) {
        generateLogs("defence", {
          player1: this.player1,
          player2: this.player2,
        });
      } else {
        this.player2.changeHP(player1Attack.value);
        changePlayerHp(this.player2);
        generateLogs("hit", {
          player1: this.player1,
          player2: this.player2,
          attackValue: player1Attack.value,
        });
      }

      if (player2Attack.hit === player1Attack.defence) {
        generateLogs("defence", {
          player1: this.player2,
          player2: this.player1,
        });
      } else {
        this.player1.changeHP(player2Attack.value);
        changePlayerHp(this.player1);
        generateLogs("hit", {
          player1: this.player2,
          player2: this.player1,
          attackValue: player2Attack.value,
        });
      }

      $controlForm.reset();
      this.#showResult();
    });
  };

  #showResult = () => {
    const isScorpionLose = this.player1.hasLose();
    const isSubZeroLose = this.player2.hasLose();

    if (isScorpionLose || isSubZeroLose) {
      if (isScorpionLose && isSubZeroLose) {
        renderRoundDraw();
        generateLogs("draw");
      } else if (isScorpionLose) {
        renderWins(this.player2.name);
        generateLogs("end", { player1: this.player2, player2: this.player1 });
      } else if (isSubZeroLose) {
        renderWins(this.player1.name);
        generateLogs("end", { player1: this.player1, player2: this.player2 });
      }

      disableControlFormSubmitButton();
      renderReloadButton();
    }
  };
}
