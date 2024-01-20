import { landing } from "./apps/landing.js";
import { tiles } from "./apps/tiles.js";
import { TYOV } from "./apps/TYOVrunner.js";

const selectItems = [["home", "tiles game", "tyov game"]];

const selectGames = {
  home: landing,
  "tiles game": tiles,
  "tyov game": TYOV,
};

function renderBanner(inEle, gameView) {
  const banner = document.createElement("div");

  banner.style.border = "1px solid white";
  banner.style.padding = "10px";

  selectItems.forEach((row) => {
    const selectElement = document.createElement("select");

    row.forEach((element) => {
      const option = document.createElement("option");
      option.value = element;
      option.text = element;

      selectElement.appendChild(option);
    });

    selectElement.addEventListener("change", function (event) {
      const selectedValue = event.target.value;
      selectGames[selectedValue](gameView);
    });

    banner.appendChild(selectElement);
  });

  inEle.appendChild(banner);
}

const main = document.getElementById("main");

const gameView = document.createElement("div");
gameView.id = "gameView";

renderBanner(main, gameView);
landing(gameView);
main.appendChild(gameView);
