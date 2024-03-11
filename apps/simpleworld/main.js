import { names, colors, rpgNames, person } from "./util/nameTool.js";

export async function simpleWorld(gameView) {
  function rC(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getWorld() {
    let buildWorld = [];

    let tiles = ["plain", "forest", "mountain"];

    for (let i = 0; i < 20; i++) {
      buildWorld.push([]);
      for (let j = 0; j < 20; j++) {
        const tile = {};
        tile["name"] = rC(tiles);
        tile["x"] = i;
        tile["y"] = j;
        tile["char"] = {};

        if (Math.random() > 0.98) {
          tile["name"] = "house";
          tile["char"]["name"] = person()["name"];
          tile["char"]["trait"] = person()["trait"];
        }

        buildWorld[i].push(tile);
      }
    }

    let outerEdges = [];

    for (let i = 0; i < buildWorld.length; i++) {
      outerEdges.push([i, 0]);
      outerEdges.push([i, buildWorld[0].length - 1]);
    }

    for (let i = 0; i < buildWorld[0].length; i++) {
      outerEdges.push([0, i]);
      outerEdges.push([buildWorld.length - 1, i]);
    }

    function rec(x, y) {
      if (
        x < 0 ||
        x > buildWorld[0].length - 1 ||
        y < 0 ||
        y > buildWorld.length - 1
      ) {
        return;
      }

      if (buildWorld[x][y]["name"] == "ocean") {
        return;
      }

      if (Math.random() > 0.65) {
        if (buildWorld[x][y]["name"] == "plain") {
          buildWorld[x][y]["name"] = "ocean";
        }

        if (buildWorld[x][y]["name"] == "forest") {
          buildWorld[x][y]["name"] = "ocean";
        }

        if (buildWorld[x][y]["name"] == "mountain") {
          buildWorld[x][y]["name"] = "ocean";
        }

        if (buildWorld[x][y]["name"] == "house") {
          buildWorld[x][y]["name"] = "ocean";
          buildWorld[x][y]["char"] = {};
        }

        rec(x - 1, y);
        rec(x + 1, y);
        rec(x, y - 1);
        rec(x, y + 1);
      }

      if (Math.random() > 0.99) {
        if (buildWorld[x][y]["name"] == "plain") {
          buildWorld[x][y]["name"] = "house";
          buildWorld[x][y]["char"]["name"] = person()["name"];
          buildWorld[x][y]["char"]["trait"] = person()["trait"];
        }
      }
    }

    for (let i = 0; i < outerEdges.length; i++) {
      rec(outerEdges[i][0], outerEdges[i][1]);
    }

    return buildWorld;
  }

  function createWorldGrid() {
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(20, 20px)";
    gridContainer.style.gridTemplateRows = "repeat(20, 20px)";
    gridContainer.style.gap = "0px";

    for (let row = 0; row < world.length; row++) {
      for (let col = 0; col < world[0].length; col++) {
        const button = document.createElement("button");
        button.id = row + "," + col;
        button.style.backgroundImage = `url(${tiles[world[row][col]["name"]]})`;
        button.style.backgroundSize = "cover";
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundPosition = "center center";

        button.addEventListener("click", function () {
          globalX = row;
          globalY = col;
          renderMapInfo();
        });

        // const image = document.createElement("img");
        // image.src = world[row][col]["img"];
        // image.style.backgroundSize = "cover";
        // image.style.position = "center center";
        // image.style.backgroundRepeat = "no-repeat";

        // button.textContent = text;
        // button.appendChild(image);

        button.style.width = "20px";
        button.style.height = "20px";

        gridContainer.appendChild(button);
      }
    }

    return gridContainer;
  }

  function renderMapInfo() {
    document.getElementById(
      "info"
    ).textContent = `x: ${globalX}, y: ${globalY}`;
    document.getElementById("tileInfo").textContent = `
  ${JSON.stringify(world[globalX][globalY]["x"])},
  ${JSON.stringify(world[globalX][globalY]["y"])},
  ${JSON.stringify(world[globalX][globalY]["name"])}`;

    document.getElementById("charInfo").textContent = `${JSON.stringify(
      world[globalX][globalY]["char"]
    )}`;
  }

  function createJsonPanel() {
    const jsonPanel = document.createElement("div");

    var keyBox = document.createElement("input");
    keyBox.type = "text";
    keyBox.placeholder = "key";

    var textBox = document.createElement("input");
    textBox.type = "text";
    textBox.placeholder = "value";

    var button = document.createElement("button");
    button.textContent = "Submit";

    button.addEventListener("click", function () {
      var textValue = textBox.value;

      if (keyBox.value === "name") {
        let placeSrc = tiles[textValue];
        world[globalX][globalY]["name"] = textValue;
        document.getElementById(
          globalX + "," + globalY
        ).style.backgroundImage = `url(${placeSrc})`;

        if (textValue === "house") {
          world[globalX][globalY]["char"] = person()["name"];
          world[globalX][globalY]["trait"] = person()["trait"];
        }
      }

      if (keyBox.value === "char") {
        world[globalX][globalY]["char"] = textValue;
      }

      if (keyBox.value === "trait") {
        world[globalX][globalY]["trait"] = textValue;
      }
    });

    jsonPanel.appendChild(keyBox);
    jsonPanel.appendChild(textBox);
    jsonPanel.appendChild(button);

    return jsonPanel;
  }

  const main = document.createElement("div");

  while (gameView.firstChild) {
    gameView.removeChild(gameView.firstChild);
  }

  gameView.appendChild(main);

  let world = getWorld();
  let globalX = 0;
  let globalY = 0;
  let tiles = {
    plain: "./apps/simpleworld/tiles/plain.png",
    forest: "./apps/simpleworld/tiles/forest.png",
    mountain: "./apps/simpleworld/tiles/mountain.png",
    ocean: "./apps/simpleworld/tiles/ocean.png",
    house: "./apps/simpleworld/tiles/house.png",
  };

  function renderContent() {
    world = getWorld();

    const infoContainer = document.createElement("div");
    infoContainer.id = "infoContainer";

    const info = document.createElement("div");
    info.id = "info";
    info.textContent = `x: ${globalX}, y: ${globalY}`;

    infoContainer.appendChild(info);
    infoContainer.appendChild(refreshButton);
    main.appendChild(infoContainer);

    const contentWrapper = document.createElement("div");
    contentWrapper.id = "contentWrapper";
    contentWrapper.style.display = "flex";
    contentWrapper.style.flexDirection = "row";
    contentWrapper.style.justifyContent = "space-between";

    const leftContentContainer = document.createElement("div");
    leftContentContainer.id = "leftContentContainer";
    leftContentContainer.style.flex = "0.5";
    leftContentContainer.style.margin = "10px";

    leftContentContainer.appendChild(createWorldGrid());

    const rightContentContainer = document.createElement("div");
    rightContentContainer.id = "rightContentContainer";
    rightContentContainer.style.flex = "1";
    rightContentContainer.style.margin = "10px";
    rightContentContainer.textContent = "Edit World Information";

    const tileInfo = document.createElement("div");
    tileInfo.id = "tileInfo";
    tileInfo.style.marginTop = "25px";
    tileInfo.textContent = "";

    const charInfo = document.createElement("div");
    charInfo.id = "charInfo";
    charInfo.style.marginTop = "25px";
    charInfo.textContent = "";

    rightContentContainer.appendChild(createJsonPanel());
    rightContentContainer.appendChild(tileInfo);
    rightContentContainer.appendChild(charInfo);

    contentWrapper.appendChild(leftContentContainer);
    contentWrapper.appendChild(rightContentContainer);

    main.appendChild(contentWrapper);
  }

  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Refresh";
  refreshButton.addEventListener("click", function () {
    main.innerHTML = "";
    renderContent();
  });

  renderContent();
}
