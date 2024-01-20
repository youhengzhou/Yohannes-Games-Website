export function getUserInput(inId) {
  return document.getElementById(inId).value;
}

export function updateView(inId, outId, info) {
  document.getElementById(inId).value = "";
  document.getElementById(outId).innerHTML = info;
}

export function renderInput(inId, outId) {
  return new Promise();
}

export async function view(inId, outId, info) {
  updateView(inId, outId, info);
  await renderInput(inId, outId);
  getUserInput(inId);
}
