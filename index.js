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
  for (const item of data) {
    buildSelectList(item);
    buildFishProfile(item);
  }
}

//adds image of fish to fishPool
function buildFishProfile(fish) {
  const fishPoolContent = document.querySelector("#fishPool .content");

  const image = document.createElement("img");
  image.src = fish.img;
  image.setAttribute("class", "image");

  fishPoolContent.appendChild(image);
}

//creates selectButton for fish
function buildSelectList(fish) {
  //const name = fish.common_name;

  const footer = document.getElementById("footer");

  const btn = document.createElement("button");
  btn.setAttribute("class", "fish-button");
  btn.textContent = `${fish.common_name}`;
  footer.appendChild(btn);

  footer.appendChild;
}
