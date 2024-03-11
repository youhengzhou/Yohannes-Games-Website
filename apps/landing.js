async function displayTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById(
    "clock"
  ).innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function landing(gameView) {
  while (gameView.firstChild) {
    gameView.removeChild(gameView.firstChild);
  }

  const welcomeContainer = document.createElement("div");
  welcomeContainer.classList.add("welcome-container");

  const title = document.createElement("h1");
  title.textContent = "Welcome to Yohannes's game website";

  const clock = document.createElement("div");
  clock.id = "clock";
  clock.innerHTML = `${0}:${0}:${0}`;
  setInterval(displayTime, 1000);

  welcomeContainer.appendChild(title);
  welcomeContainer.appendChild(clock);

  gameView.appendChild(welcomeContainer);
}
