export function landing(gameView) {
  while (gameView.firstChild) {
    gameView.removeChild(gameView.firstChild);
  }

  const welcomeContainer = document.createElement("div");
  welcomeContainer.classList.add("welcome-container");

  const title = document.createElement("h1");
  title.textContent = "Welcome to Yohannes's game website";

  const description = document.createElement("p");
  description.textContent = "Explore a wide variety of games and have fun!";

  welcomeContainer.appendChild(title);
  welcomeContainer.appendChild(description);

  gameView.appendChild(welcomeContainer);
}
