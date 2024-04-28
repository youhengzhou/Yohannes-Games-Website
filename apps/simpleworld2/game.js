class Experiments {
  worldMapExp() {
    let globalState = {
      worldMap: [[]],
      factions: {
        faction1: {},
      },
    };

    globalState["worldMap"] = getWorld(5, 5);

    console.log(JSON.stringify(globalState, null, 2));
  }

  timeLine() {
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
}

import {
  names,
  colors,
  rpgNames,
  person,
  rC,
  StoryGenerator,
} from "./util/nameTool.js";

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
          atrs: {
            adm: 0,
            pop: 0,
            mrl: 0,
            prd: 0,
          },
        },
      };

      if (Math.random() > 0.98) {
        tile.name = "house";
        tile.char.name = person().name;
        tile.char.trait = person().trait;
        tile.char.atrs = {
          adm: Math.floor(Math.random() * 6) + 1,
          pop: Math.floor(Math.random() * 6) + 1,
          mrl: Math.floor(Math.random() * 6) + 1,
          prd: Math.floor(Math.random() * 6) + 1,
        };
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
      worldMap[x][y].char.atrs = {
        adm: Math.floor(Math.random() * 6) + 100,
        pop: Math.floor(Math.random() * 6) + 1,
        mrl: Math.floor(Math.random() * 6) + 1,
        prd: Math.floor(Math.random() * 6) + 1,
      };
    }
  }

  for (let i = 0; i < outerEdges.length; i++) {
    rec(outerEdges[i][0], outerEdges[i][1]);
  }

  return worldMap;
}

let worldMap = getWorld(20, 20);

console.log(worldMap);

let selectedRow = 0;
let selectedCol = 0;

function setTileImage(button, row, col) {
  const tileImage = document.createElement("img");
  tileImage.src = `apps/simpleworld2/tiles/${worldMap[row][col].name}.png`;
  tileImage.alt = worldMap[row][col].name;
  tileImage.style.width = "100%";
  tileImage.style.height = "100%";
  tileImage.style.objectFit = "cover";

  button.innerHTML = "";
  button.appendChild(tileImage);
}

function displayTileInfo(row, col) {
  const tileValue = worldMap[row][col];
  const tileString = JSON.stringify(tileValue, null, 2);

  const selectedTileTextboxFull = document.getElementById(
    "selectedTileTextboxFull"
  );
  selectedTileTextboxFull.value = tileString;

  const selectedTileTextbox = document.getElementById("selectedTileTextbox");
  selectedTileTextbox.value = `Selected Tile: (${row}, ${col})`;

  const tileTextbox = document.getElementById("tileTextbox");
  tileTextbox.value = tileValue.name;

  const charNameTextbox = document.getElementById("charNameTextbox");
  charNameTextbox.value = tileValue.char.name;

  const charTraitTextbox = document.getElementById("charTraitTextbox");
  charTraitTextbox.value = tileValue.char.trait;

  const charAtrsTextbox = document.getElementById("charAtrsTextbox");
  const atrs = worldMap[row][col].char.atrs;
  const atrsString = JSON.stringify(atrs, null, 2);
  charAtrsTextbox.value = atrsString;

  selectedRow = row;
  selectedCol = col;
}

function createTextbox(id, placeholder) {
  const textbox = document.createElement("input");
  textbox.type = "text";
  textbox.id = id;
  textbox.placeholder = placeholder;
  textbox.style.width = "100%";
  textbox.style.marginBottom = "10px";
  return textbox;
}

function tileInfoTextboxes() {
  const container = document.createElement("div");

  const selectedTileTextboxFull = createTextbox("selectedTileTextboxFull", "");
  selectedTileTextboxFull.readOnly = true;
  selectedTileTextboxFull.style.backgroundColor = "#f0f0f0";
  selectedTileTextboxFull.style.color = "#333";
  selectedTileTextboxFull.style.textAlign = "center";

  const selectedTileTextbox = createTextbox("selectedTileTextbox", "");
  selectedTileTextbox.readOnly = true;
  selectedTileTextbox.style.backgroundColor = "#f0f0f0";
  selectedTileTextbox.style.color = "#333";
  selectedTileTextbox.style.textAlign = "center";

  const tileTextbox = createTextbox("tileTextbox", "Tile");
  const charNameTextbox = createTextbox("charNameTextbox", "Character Name");
  const charTraitTextbox = createTextbox("charTraitTextbox", "Character Trait");

  const charAtrsTextbox = document.createElement("textarea");
  charAtrsTextbox.id = "charAtrsTextbox";
  charAtrsTextbox.readOnly = true;
  charAtrsTextbox.style.width = "100%";
  charAtrsTextbox.style.height = "100px";
  charAtrsTextbox.style.marginBottom = "10px";
  charAtrsTextbox.style.backgroundColor = "#f0f0f0";
  charAtrsTextbox.style.color = "#333";
  charAtrsTextbox.style.textAlign = "center";
  charAtrsTextbox.style.fontFamily = "monospace";

  tileTextbox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newValue = tileTextbox.value;
      const selectedButton = document.getElementById(
        selectedRow + "," + selectedCol
      );

      worldMap[selectedRow][selectedCol].name = newValue;

      setTileImage(selectedButton, selectedRow, selectedCol);
    }
  });

  charNameTextbox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newValue = charNameTextbox.value;

      worldMap[selectedRow][selectedCol].char.name = newValue;
    }
  });

  charTraitTextbox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newValue = charTraitTextbox.value;

      worldMap[selectedRow][selectedCol].char.trait = newValue;
    }
  });

  container.appendChild(selectedTileTextboxFull);
  container.appendChild(selectedTileTextbox);
  container.appendChild(tileTextbox);
  container.appendChild(charNameTextbox);
  container.appendChild(charTraitTextbox);
  container.appendChild(charAtrsTextbox);

  return container;
}

function initWorldGrid(tileSize) {
  const gridContainer = document.createElement("div");
  gridContainer.id = "gridContainer";
  gridContainer.style.display = "grid";
  gridContainer.style.gap = "0px";

  updateWorldMapTiles(gridContainer, worldMap, tileSize);

  return gridContainer;
}

function updateWorldMapTiles(gridContainer, worldMap, tileSize) {
  const rowSize = worldMap.length;
  const colSize = worldMap[0].length;

  gridContainer.style.gridTemplateRows = `repeat(${rowSize}, ${tileSize}px)`;
  gridContainer.style.gridTemplateColumns = `repeat(${colSize}, ${tileSize}px)`;

  gridContainer.innerHTML = "";

  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < colSize; col++) {
      const button = document.createElement("button");
      button.id = row + "," + col;
      button.style.backgroundColor = "white";
      button.style.border = "none";
      button.style.padding = "0";
      button.style.width = `${tileSize}px`;
      button.style.height = `${tileSize}px`;

      setTileImage(button, row, col);
      button.addEventListener("click", function () {
        displayTileInfo(row, col);
      });

      gridContainer.appendChild(button);
    }
  }
}

function worldMapInfoTextbox() {
  const container = document.createElement("div");

  const worldMapInfoTextbox = document.createElement("textarea");
  worldMapInfoTextbox.id = "worldMapInfoTextbox";
  worldMapInfoTextbox.style.width = "100%";
  worldMapInfoTextbox.style.height = "200px";
  worldMapInfoTextbox.style.marginTop = "20px";
  worldMapInfoTextbox.style.padding = "10px";
  worldMapInfoTextbox.style.fontSize = "14px";
  worldMapInfoTextbox.style.fontFamily = "monospace";
  worldMapInfoTextbox.style.resize = "none";

  const outputButton = document.createElement("button");
  outputButton.textContent = "Output WorldMap";
  outputButton.style.marginTop = "10px";
  outputButton.addEventListener("click", function () {
    const worldMapString = JSON.stringify(worldMap, null, 2);
    worldMapInfoTextbox.value = worldMapString;
  });

  const readButton = document.createElement("button");
  readButton.textContent = "Read WorldMap";
  readButton.style.marginTop = "10px";
  readButton.addEventListener("click", function () {
    const worldMapString = worldMapInfoTextbox.value;
    try {
      const parsedWorldMap = JSON.parse(worldMapString);
      worldMap = parsedWorldMap;
      updateWorldMapTiles(gridContainer, worldMap, 20);
      console.log("WorldMap updated successfully!");
    } catch (error) {
      console.error("Error parsing WorldMap:", error);
    }
  });

  container.appendChild(worldMapInfoTextbox);
  container.appendChild(outputButton);
  container.appendChild(readButton);

  return container;
}

function refreshWorldMap() {
  worldMap = getWorld(20, 20);
  updateWorldMapTiles(gridContainer, worldMap, 20);
  console.log("WorldMap refreshed successfully!");
}

function refreshWorldMapButton() {
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Refresh WorldMap";
  refreshButton.style.marginTop = "10px";
  refreshButton.addEventListener("click", function () {
    refreshWorldMap();
  });

  return refreshButton;
}

export function mapGame() {
  const mapGame = document.createElement("div");
  mapGame.style.display = "flex";

  const leftDiv = document.createElement("div");
  leftDiv.style.flex = "1";
  leftDiv.style.padding = "20px";
  leftDiv.style.backgroundColor = "#f1f1f1";
  leftDiv.appendChild(initWorldGrid(20));

  const rightDiv = document.createElement("div");
  rightDiv.style.flex = "1";
  rightDiv.style.padding = "20px";
  rightDiv.style.backgroundColor = "#e9e9e9";
  rightDiv.appendChild(tileInfoTextboxes());
  rightDiv.appendChild(worldMapInfoTextbox());
  rightDiv.appendChild(refreshWorldMapButton());

  mapGame.appendChild(leftDiv);
  mapGame.appendChild(rightDiv);
  return mapGame;
}
