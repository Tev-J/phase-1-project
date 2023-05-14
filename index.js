document.addEventListener("DOMContentLoaded", function () {
  //   Stuff
  //
  //
  //

  //API Endpoint
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));
});

function parseFishData(data) {
  for (fish in data) {
    buildSelectList(fish);
  }
}

//adds image of fish to fishPool
function buildFishProfile() {
  const fishPool = document.querySelector("fishPool.content");
}

//creates selectButton for fish
function buildSelectList(data) {
  const name = data.common_name;
  console.log(data);

  const footer = document.getElementById("footer");

  const btn = document.createElement("button");
  btn.setAttribute("id", "fish-button");
  btn.textContent = `${name}`;
  footer.appendChild(btn);

  footer.appendChild;
}
