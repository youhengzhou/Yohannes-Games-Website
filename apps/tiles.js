import { rC } from "../util/utilFuncs.js";
import { names, colors, rpgNames } from "../util/nameTool.js";

class Person {
  constructor(name = "") {
    if (name === "") {
      this.name =
        rC(rpgNames["male_names"]) + " " + rC(rC(rpgNames["namesList"]));
      this.color = colors()["highlander"];
      this.traits = [];
    }
  }
}

class Place {
  constructor(name = "") {
    if (name === "") {
      this.geography = rC(["plains", "forests", "mountains", "hills", "water"]);

      this.name =
        rC(rC(rpgNames["namesList"])) +
        " " +
        rC(["plains", "forests", "mountains", "hills"]);
    }
  }
}

function buildWorld(rows, columns) {
  let world = new Array(rows)
    .fill(null)
    .map(() => new Array(columns).fill(null));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      world[i][j] = {
        person: null,
        place: null,
      };
      if (Math.random() > 0.75) {
        world[i][j]["person"] = new Person();
        world[i][j]["place"] = new Place();
      } else {
        world[i][j]["person"] = new Person("none");
        world[i][j]["place"] = new Place("none");
      }
    }
  }

  return world;
}

function initInformationView(inEle) {
  let informationView = document.createElement("div");
  informationView.id = "informationView";
  informationView.style.border = "1px solid white";
  informationView.style.padding = "50px";
  informationView.style.marginBottom = "50px";
  informationView.style.width = "400px";
  informationView.style.height = "50px";
  inEle.appendChild(informationView);
  informationView.innerHTML = "Information View";
}

function render(inEle, world) {
  world.forEach((row) => {
    let htmlRow = document.createElement("div");
    htmlRow.style.display = "grid";
    htmlRow.style.gridTemplateColumns = "repeat(auto-fit, 200px)";
    row.forEach((element) => {
      let htmlCell = document.createElement("div");
      htmlCell.textContent = element["place"].name;
      htmlCell.style.border = "1px solid white";

      let htmlButton = document.createElement("button");
      htmlButton.textContent = "show more";
      htmlButton.style.border = "1px solid white";

      htmlButton.addEventListener("click", () => {
        informationView.innerHTML =
          JSON.stringify(element["person"]) + JSON.stringify(element["place"]);
      });

      htmlCell.appendChild(htmlButton);
      htmlRow.appendChild(htmlCell);
    });
    inEle.appendChild(htmlRow);
  });
}

export function tiles(gameView) {
  if (gameView) {
    while (gameView.firstChild) {
      gameView.removeChild(gameView.firstChild);
    }
  }

  let world = buildWorld(6, 6);
  initInformationView(gameView);
  render(gameView, world);
}
