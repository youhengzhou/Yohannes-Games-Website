export function getUserInput() {
  return document.getElementById("userInput").value;
}

export function updateView(info) {
  document.getElementById("userInput").value = "";
  document.getElementById("output").innerHTML = info;
}

export function waitForButtonClick() {
  return new Promise(function (resolve) {
    const button = document.getElementById("userInputButton");
    const input = document.getElementById("userInput");

    let isClicking = false;

    const clickHandler = function () {
      isClicking = true;
      resolve();
    };

    const keyHandler = function (event) {
      if (event.key === "Enter" && !isClicking) {
        isClicking = true;
        button.click();
        resolve();
      }
    };

    button.addEventListener("click", clickHandler);
    input.addEventListener("keydown", keyHandler);
  });
}

export async function view(info) {
  updateView(info);
  await waitForButtonClick();
  return getUserInput();
}
