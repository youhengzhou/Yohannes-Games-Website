import { view } from "./view.js";
import { createCharFunc, tyovFunc, diceFunc } from "./TYOV.js";

function createTYOVView() {
  const outputDiv = document.createElement("div");
  outputDiv.id = "output";
  outputDiv.textContent = "sample";

  const userInputPanelDiv = document.createElement("div");
  userInputPanelDiv.id = "userInputPanel";

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.id = "userInput";

  const buttonElement = document.createElement("button");
  buttonElement.id = "userInputButton";
  buttonElement.textContent = "Enter";

  userInputPanelDiv.appendChild(inputElement);
  userInputPanelDiv.appendChild(buttonElement);

  const container = document.createElement("div");
  container.appendChild(outputDiv);
  container.appendChild(userInputPanelDiv);

  return container;
}

export async function TYOV(gameView) {
  let time = 0;
  let charInfo = "";

  while (gameView.firstChild) {
    gameView.removeChild(gameView.firstChild);
  }

  gameView.appendChild(createTYOVView());

  while (true) {
    let text = await view(
      "Please insert command:<br>1. init<br>2. game<br>3. quit<br>any other input will be a dice roll"
    );

    if (text == "quit") {
      await view("thank you for playing");
      break;
    } else if (text == "init") {
      charInfo = await createCharFunc();
    } else if (text == "game") {
      await tyovFunc(charInfo);
    } else {
      await diceFunc(text);
    }
    time += 1;
  }
}

// await main();
