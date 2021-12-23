import { LOGS } from "../constants.js";
import formatTime from "./formatTime.js";
import getRandom from "./getRandom.js";

const makeLog = (type, context = {}) => {
  const { player1, player2, attackValue } = context;
  const logType = LOGS[type];
  const time = formatTime(new Date());
  const text = Array.isArray(logType)
    ? logType[getRandom(0, logType.length - 1)]
    : logType;

  switch (type) {
    case "start":
      return text
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);

    case "end": {
      const textReplaced = text
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      return `${time} - ${textReplaced}`;
    }

    case "hit": {
      const textReplaced = text
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      return `${time} - ${textReplaced} -${attackValue} [${player2.hp}/100]`;
    }

    case "defence": {
      const textReplaced = text
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      return `${time} - ${textReplaced}`;
    }

    case "draw":
      return text;

    default:
      throw new Error('Argument "type" is defined incorrectly');
  }
};

export default makeLog;
