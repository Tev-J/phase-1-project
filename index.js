document.addEventListener("DOMContentLoaded", function () {
  //API Endpoint to
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));
});

let dataObj = [];

function parseFishData(data) {
  console.log(data);

  for (const item of data) {
    buildSelectList(item);
    showFishImages(item);
  }
}

//adds image of fish to fishPool
function showFishImages(fish) {
  const fishPoolContent = document.querySelector("#fishPool .content");

  const image = document.createElement("img");
  image.src = fish.img;
  image.setAttribute("class", "image");

  fishPoolContent.appendChild(image);
}

//creates selectButton for fish
function buildSelectList(fish) {
  const header = document.getElementById("middleAreaH");

  const btn = document.createElement("button");
  btn.setAttribute("class", "fish-button");
  btn.textContent = `${fish.common_name}`;
  header.appendChild(btn);

  header.appendChild;
}

//handlesClickEvent -- populates side tab and header bar
function handleImageClicks(e) {
  console.log(e);
}

//Event Listener for Buttons
function fetchFromDB(web = "http://localhost:3000/fish") {
  const fetchFishes = fetch(web)
    .then((res) => res.json())
    .then((data) => data);
}
