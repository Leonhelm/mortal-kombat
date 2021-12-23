import { CHARACTERS } from "./constants.js";
import { createPlayer } from "./domains/player.js";
import { enemyAttack } from "./domains/enemy.js";
import {
  $controlForm,
  playerAttack,
  renderPlayer,
  renderReloadButton,
  disableControlFormSubmitButton,
  renderRoundDraw,
  renderWins,
  changePlayerHp,
} from "./views/arenas.js";
import { generateLogs } from "./views/chat.js";

const scorpion = createPlayer(CHARACTERS.scorpion);
const subZero = createPlayer(CHARACTERS.subZero);

renderPlayer(scorpion);
renderPlayer(subZero);
generateLogs("start", { player1: subZero, player2: scorpion });

$controlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const scorpionAttack = playerAttack();
  const subZeroAttack = enemyAttack();
  $controlForm.reset();

  if (scorpionAttack.hit === subZeroAttack.defence) {
    generateLogs("defence", { player1: scorpion, player2: subZero });
  } else {
    subZero.changeHP(scorpionAttack.value);
    changePlayerHp(subZero);
    generateLogs("hit", {
      player1: scorpion,
      player2: subZero,
      attackValue: scorpionAttack.value,
    });
  }

  if (subZeroAttack.hit === scorpionAttack.defence) {
    generateLogs("defence", { player1: subZero, player2: scorpion });
  } else {
    scorpion.changeHP(subZeroAttack.value);
    changePlayerHp(scorpion);
    generateLogs("hit", {
      player1: subZero,
      player2: scorpion,
      attackValue: subZeroAttack.value,
    });
  }

  showResult();
});

function showResult() {
  const isScorpionLose = scorpion.hasLose();
  const isSubZeroLose = subZero.hasLose();

  if (isScorpionLose || isSubZeroLose) {
    if (isScorpionLose && isSubZeroLose) {
      renderRoundDraw();
      generateLogs("draw");
    } else if (isScorpionLose) {
      renderWins(subZero.name);
      generateLogs("end", { player1: subZero, player2: scorpion });
    } else if (isSubZeroLose) {
      renderWins(scorpion.name);
      generateLogs("end", { player1: scorpion, player2: subZero });
    }

    disableControlFormSubmitButton();
    renderReloadButton();
  }
}
