import { landing } from "./apps/landing.js";
import { tiles } from "./apps/tiles.js";
import { TYOV } from "./apps/TYOV/TYOVrunner.js";
import { simpleWorld } from "./apps/simpleworld/main.js";
import { sw2 } from "./apps/simpleworld2/main.js";

const selectGames = {
  home: landing,
  "tiles game": tiles,
  "tyov game": TYOV,
  "simple world": simpleWorld,
  "simple world 2": sw2,
};

const selectItems = [Object.keys(selectGames), ["temp"]];

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
