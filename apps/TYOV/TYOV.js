import { view } from "./view.js";
import { createChar, TYOV } from "./model.js";

function play(game, charInfo = {}) {
  function randomRoll(dictionary) {
    function rollDice() {
      return (
        Math.floor(Math.random() * 10) + 1 - Math.floor(Math.random() * 6) + 1
      );
    }

    function updateRoll(roll, increment = 0) {
      return rollDice() + roll + increment;
    }

    function assignPart(countsOfRoll, roll) {
      let currentCount = countsOfRoll[roll] || 0;
      countsOfRoll[roll] = currentCount + 1;
      return roll + String.fromCharCode("a".charCodeAt(0) + currentCount);
    }

    let out = {}; // key+letter: value
    let countsOfRoll = {};

    let roll = 0;
    while (roll <= 80) {
      roll = updateRoll(roll, 2);
      let part = assignPart(countsOfRoll, roll);

      // This code snippet checks if the variable part is a key in the dictionary.
      // If it is, it assigns the corresponding value to the out object with the same key.
      if (part in dictionary) {
        out[part] = dictionary[part];
      }
    }
    return out;
  }

  let out = {};

  out = randomRoll(game);

  out["0"] = charInfo;

  return out;
}

function objToString(obj) {
  let result = "";
  for (const [key, value] of Object.entries(obj)) {
    result += `${key}: ${value}<br><br>`;
  }
  return result;
}

function dice(num) {
  if (num === 0) {
    return "helper<br>0: dead, 1: wounded, 2: injured, 3: fatigued, 4: layman, 5: trained, 6: veteran, 7: master 8: peak human 9: super human";
  }
  return Math.floor(Math.random() * num) + 1;
}

export async function createCharFunc() {
  return await view(objToString(createChar));
}

export async function tyovFunc(charInfo) {
  await view(objToString(play(TYOV, charInfo)));
}

export async function diceFunc(text) {
  return await view(dice(parseInt(text)));
}
