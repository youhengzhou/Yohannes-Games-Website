import { mapGame } from "./game.js";

export function sw2(gameView) {
  while (gameView.firstChild) {
    gameView.removeChild(gameView.firstChild);
  }
  const mainDiv = document.getElementById("main");
  mainDiv.appendChild(mapGame());
  gameView.append(mainDiv);
}
