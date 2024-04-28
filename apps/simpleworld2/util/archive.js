import { names, colors, rpgNames, person, rC } from "./nameTool.js";

// const core = {
//   look: ["blonde", "redhead", "brown", "black"],
//   build: ["tall", "strong", "average", "weak"],
// };

// const assassin = {
//   look: [
//     "black short hair",
//     "black long hair",
//     "black bun",
//     "black velvet drapes",
//   ],
// };

// const output = {
//   look: rC(assassin["look"]),
// };

// console.log(output);

function v1ProtagonistCareerGen() {
  const paths = ["soldier", "mercenary", "officer", "general"];

  const soldier = {
    future: ["soldier", "mercenary", "officer", "general"],
  };

  const mercenary = {
    future: ["soldier", "mercenary", "officer", "general"],
  };

  const officer = {
    future: ["officer", "general"],
  };

  const general = {
    future: ["general"],
  };

  const pathFuture = {
    soldier: soldier.future,
    mercenary: mercenary.future,
    officer: officer.future,
    general: general.future,
  };

  class Protagonist {
    constructor(job) {
      this.jobHistory = [job];
    }
  }

  let protagonist = new Protagonist("soldier");

  let year = 0;

  while (year <= 10) {
    let currentJob = protagonist.jobHistory[protagonist.jobHistory.length - 1];

    let newJob = rC(pathFuture[currentJob]);

    protagonist.jobHistory.push(newJob);
    year += 1;
  }

  console.log(protagonist);
}

const paths = ["soldier", "mercenary", "officer", "general"];

const pathFuture = {
  soldier: ["soldier", "mercenary", "officer", "general"],
  mercenary: ["soldier", "mercenary", "officer", "general"],
  officer: ["officer", "general"],
  general: ["general"],
};

class Protagonist {
  constructor(initialJob) {
    this.jobHistory = [initialJob];
  }

  advanceCareer(years) {
    for (let i = 0; i < years; i++) {
      const currentJob = this.jobHistory[this.jobHistory.length - 1];
      const newJob = rC(pathFuture[currentJob]);
      this.jobHistory.push(newJob);
    }
  }
}

const protagonist = new Protagonist("soldier");
protagonist.advanceCareer(10);
// console.log(protagonist.jobHistory);

function v2() {
  const char = {
    look: ["blonde", "red", "brown", "black"],
    build: ["weak", "average", "strong", "long"],
    skill: ["talker", "fighter", "rogue", "erudite"],
    goal: ["survival", "resources", "relationships", "idea"],
  };

  const place = {
    look: ["poor", "common", "decorated", "rich"],
    type: ["edge", "transitional", "typical", "complex"],
    population: ["empty", "sparse", "populated", "busy"],
    welcome: ["open", "public", "private", "secluded"],
  };

  const scene = {
    own: ["stolen", "foreign", "common", "own"],
    alignment: ["helpful", "neutral", "unexpected", "opposing"],
    rarity: ["insignificant", "mundane", "special", "unique"],
    type: ["event", "entity", "object", "environment"],
  };

  const plot = {
    writing: ["artistry", "dialogue", "description", "exposition"],
    narrative: ["foreshadow", "reveal", "action", "fallout"],
    goal: ["create", "take", "seek", "destroy"],
    step: ["casing", "entry", "objective", "extraction"],
  };

  const emotions = [
    "enlightenment",
    "peace",
    "joy",
    "love",
    "reason",
    "acceptance",
    "willingness",
    "neutrality",
    "courage",
    "pride",
    "anger",
    "desire",
    "fear",
    "grief",
    "apathy",
    "guilt",
    "shame",
  ];

  function generateCharString(char) {
    return `A ${rC(char.look)} ${rC(char.build)} ${rC(
      char.skill
    )} driven by ${rC(char.goal)}.`;
  }

  function generatePlaceString(place) {
    return `A ${rC(place.look)} ${rC(place.type)} location, ${rC(
      place.population
    )} and ${rC(place.welcome)}.`;
  }

  function generateSceneString(scene) {
    return `${rC(scene.own)} ${rC(scene.alignment)} ${rC(scene.rarity)} ${rC(
      scene.type
    )}.`;
  }

  function generatePlotString(plot) {
    return `${rC(plot.writing)} focuses on ${rC(
      plot.narrative
    )}, aiming to ${rC(plot.goal)} during the ${rC(plot.step)} phase.`;
  }

  const charString0 = generateCharString(char);
  const charString1 = generateCharString(char);
  const charString2 = generateCharString(char);
  const placeString = generatePlaceString(place);
  const sceneString = generateSceneString(scene);
  const plotString = generatePlotString(plot);

  console.log(generateCharString(char));
  console.log(generatePlaceString(place));
  console.log("---");
  console.log(generateCharString(char));
  console.log(generatePlaceString(place));
  console.log("---");
  console.log(generateCharString(char));
  console.log(generatePlaceString(place));
  console.log("---");
  console.log(sceneString);
  console.log(plotString);

  let map = [0, 0, 0, 0, 0];

  for (let i = 0; i < map.length; i++) {
    let info = {
      place: rC(place.type),
      ruler: generateCharString(char),
      emotion: rC(emotions),
    };
    map[i] = info;
  }

  console.log(map);
}

class StoryGenerator {
  constructor() {
    this.data = {
      char: {
        look: ["blonde", "red", "brown", "black"],
        build: ["weak", "average", "strong", "long"],
        skill: ["talker", "fighter", "rogue", "erudite"],
        goal: ["survival", "resources", "relationships", "idea"],
      },
      place: {
        look: ["poor", "common", "decorated", "rich"],
        type: ["edge", "transitional", "typical", "complex"],
        population: ["empty", "sparse", "populated", "busy"],
        welcome: ["open", "public", "private", "secluded"],
      },
      scene: {
        own: ["stolen", "foreign", "common", "own"],
        alignment: ["helpful", "neutral", "unexpected", "opposing"],
        rarity: ["insignificant", "mundane", "special", "unique"],
        type: ["event", "entity", "object", "environment"],
      },
      plot: {
        writing: ["artistry", "dialogue", "description", "exposition"],
        narrative: ["foreshadow", "reveal", "action", "fallout"],
        goal: ["create", "take", "seek", "destroy"],
        step: ["casing", "entry", "objective", "extraction"],
      },
      emotions: [
        "enlightenment",
        "peace",
        "joy",
        "love",
        "reason",
        "acceptance",
        "willingness",
        "neutrality",
        "courage",
        "pride",
        "anger",
        "desire",
        "fear",
        "grief",
        "apathy",
        "guilt",
        "shame",
      ],
    };
  }

  generateString(type, keys) {
    const values = keys.map((key) => rC(this.data[type][key]));
    return values.join(" ");
  }

  generateCharString() {
    return `A ${this.generateString("char", [
      "look",
      "build",
      "skill",
    ])} driven by ${rC(this.data.char.goal)}.`;
  }

  generatePlaceString() {
    return `A ${this.generateString("place", ["look", "type"])} location, ${rC(
      this.data.place.population
    )} and ${rC(this.data.place.welcome)}.`;
  }

  generateSceneString() {
    return `${this.generateString("scene", [
      "own",
      "alignment",
      "rarity",
      "type",
    ])}.`;
  }

  generatePlotString() {
    return `${rC(this.data.plot.writing)} focuses on ${rC(
      this.data.plot.narrative
    )}, aiming to ${rC(this.data.plot.goal)} during the ${rC(
      this.data.plot.step
    )} phase.`;
  }
}

function gamev2() {
  // import {
  //   names,
  //   colors,
  //   rpgNames,
  //   person,
  //   rC,
  //   StoryGenerator,
  // } from "./util/nameTool.js";

  let globalState = {
    worldMap: [[]],
    factions: {
      faction1: {},
    },
  };

  globalState["worldMap"] = getWorld(5, 5);

  console.log(JSON.stringify(globalState, null, 2));

  function timeLine() {
    let arr = [0];
    let time = 0;
    while (time < 10) {
      let currEvent = arr.shift();
      let nextEvent = Math.floor(Math.random() * 6 + 1);
      console.log(nextEvent);
      arr.push(currEvent + nextEvent);
      time += 1;
    }
    console.log(arr);
  }

  function getWorld(rows, cols) {
    const worldMap = [];
    const tiles = ["plain", "forest", "mountain"];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const tile = {
          name: rC(tiles),
          x: i,
          y: j,
          char: {
            name: "",
            trait: "",
          },
        };

        if (Math.random() > 0.98) {
          tile.name = "house";
          tile.char.name = person().name;
          tile.char.trait = person().trait;
        }

        row.push(tile);
      }
      worldMap.push(row);
    }

    const outerEdges = [];

    for (let i = 0; i < worldMap.length; i++) {
      outerEdges.push([i, 0]);
      outerEdges.push([i, worldMap[0].length - 1]);
    }

    for (let i = 0; i < worldMap[0].length; i++) {
      outerEdges.push([0, i]);
      outerEdges.push([worldMap.length - 1, i]);
    }

    function rec(x, y) {
      if (
        x < 0 ||
        x > worldMap[0].length - 1 ||
        y < 0 ||
        y > worldMap.length - 1
      ) {
        return;
      }

      if (worldMap[x][y].name === "ocean") {
        return;
      }

      if (Math.random() > 0.65) {
        if (
          ["plain", "forest", "mountain", "house"].includes(worldMap[x][y].name)
        ) {
          worldMap[x][y].name = "ocean";
          worldMap[x][y].char = {};
        }

        rec(x - 1, y);
        rec(x + 1, y);
        rec(x, y - 1);
        rec(x, y + 1);
      }

      if (Math.random() > 0.99 && worldMap[x][y].name === "plain") {
        worldMap[x][y].name = "house";
        worldMap[x][y].char.name = person().name;
        worldMap[x][y].char.trait = person().trait;
      }
    }

    for (let i = 0; i < outerEdges.length; i++) {
      rec(outerEdges[i][0], outerEdges[i][1]);
    }

    return worldMap;
  }

  let worldMap = getWorld(20, 20);

  let selectedRow = 0;
  let selectedCol = 0;

  function displayTileInfo(row, col) {
    const tileValue = worldMap[row][col];
    const tileString = JSON.stringify(tileValue, null, 2);

    const tileInfoTextbox = document.getElementById("tileInfoTextbox");
    tileInfoTextbox.value = `Tile (${row}, ${col}):\n${tileString}`;

    selectedRow = row;
    selectedCol = col;
  }

  function createWorldGrid(worldMap, tileSize) {
    const rowSize = worldMap.length;
    const colSize = worldMap[0].length;

    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gridContainer.style.display = "grid";

    gridContainer.style.gridTemplateRows = `repeat(${rowSize}, ${tileSize}px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${colSize}, ${tileSize}px)`;
    gridContainer.style.gap = "0px";

    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        function backgroundImageWay() {
          const button = document.createElement("button");
          button.id = row + "," + col;
          button.style.backgroundImage = `url(tiles/${worldMap[row][col].name}.png)`;
          button.style.backgroundSize = "cover";
          button.style.backgroundRepeat = "no-repeat";
          button.style.backgroundPosition = "center center";
          button.style.border = "none";
          button.style.padding = "0";
          button.style.width = `${tileSize}px`;
          button.style.height = `${tileSize}px`;

          button.addEventListener("click", function () {
            displayTileInfo(row, col);
          });

          gridContainer.appendChild(button);
        }

        const button = document.createElement("button");
        button.id = row + "," + col;
        button.style.backgroundColor = "white";
        button.style.border = "none";
        button.style.padding = "0";
        button.style.width = `${tileSize}px`;
        button.style.height = `${tileSize}px`;

        const tileImage = document.createElement("img");
        tileImage.src = `tiles/${worldMap[row][col].name}.png`;
        tileImage.alt = worldMap[row][col].name;
        tileImage.style.width = "100%";
        tileImage.style.height = "100%";
        tileImage.style.objectFit = "cover";

        button.addEventListener("click", function () {
          displayTileInfo(row, col);
        });
        button.appendChild(tileImage);

        gridContainer.appendChild(button);
      }
    }

    return gridContainer;
  }

  function tileInfoTextbox() {
    const tileInfoTextbox = document.createElement("input");
    tileInfoTextbox.type = "text";
    tileInfoTextbox.id = "tileInfoTextbox";
    tileInfoTextbox.style.width = "100%";
    tileInfoTextbox.style.height = "100px";

    tileInfoTextbox.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newValue = tileInfoTextbox.value;
        const selectedButton = document.getElementById(
          selectedRow + "," + selectedCol
        );
        selectedButton.textContent = newValue;
        worldMap[selectedRow][selectedCol] = newValue;
      }
    });
    return tileInfoTextbox;
  }

  function worldMapInfoTextbox() {
    const worldMapInfoTextbox = document.createElement("textarea");
    worldMapInfoTextbox.id = "worldMapInfoTextbox";
    worldMapInfoTextbox.style.width = "100%";
    worldMapInfoTextbox.style.height = "200px";
    worldMapInfoTextbox.style.marginTop = "20px";
    worldMapInfoTextbox.style.padding = "10px";
    worldMapInfoTextbox.style.fontSize = "14px";
    worldMapInfoTextbox.style.fontFamily = "monospace";
    worldMapInfoTextbox.style.resize = "none";
    worldMapInfoTextbox.readOnly = true;

    const worldMapString = JSON.stringify(worldMap, null, 2);

    worldMapInfoTextbox.value = worldMapString;

    return worldMapInfoTextbox;
  }

  export function mapGame() {
    const mapGame = document.createElement("div");
    mapGame.style.display = "flex";

    const leftDiv = document.createElement("div");
    leftDiv.style.flex = "1";
    leftDiv.style.padding = "20px";
    leftDiv.style.backgroundColor = "#f1f1f1";
    leftDiv.appendChild(createWorldGrid(worldMap, 20));

    const rightDiv = document.createElement("div");
    rightDiv.style.flex = "1";
    rightDiv.style.padding = "20px";
    rightDiv.style.backgroundColor = "#e9e9e9";
    rightDiv.appendChild(tileInfoTextbox());
    rightDiv.appendChild(worldMapInfoTextbox());

    mapGame.appendChild(leftDiv);
    mapGame.appendChild(rightDiv);
    return mapGame;
  }
}

function dynamicRowCol() {
  const rowColIndicator = document.createElement("div");
  rowColIndicator.id = "rowColIndicator";
  rowColIndicator.style.position = "absolute";
  rowColIndicator.style.top = "10px";
  rowColIndicator.style.left = "10px";
  rowColIndicator.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  rowColIndicator.style.padding = "5px";
  rowColIndicator.style.fontSize = "14px";
  rowColIndicator.textContent = "Row: 0, Col: 0";

  gridContainer.addEventListener("mousemove", function (event) {
    const rect = gridContainer.getBoundingClientRect();
    const row = Math.floor((event.clientY - rect.top) / tileSize);
    const col = Math.floor((event.clientX - rect.left) / tileSize);
    rowColIndicator.textContent = `Row: ${row}, Col: ${col}`;
  });

  gridContainer.addEventListener("mouseleave", function () {
    rowColIndicator.textContent = "Row: 0, Col: 0";
  });
}
