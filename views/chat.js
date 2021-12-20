import makeLog from "../utils/makeLog.js";

const $chat = document.querySelector(".chat");

export const generateLogs = (type, context) => {
  const log = makeLog(type, context);
  const el = `<p>${log}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};
