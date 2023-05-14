document.addEventListener("DOMContentLoaded", function () {
  //
  //
  //
  //API Endpoint
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));

  //Event listener for images
  const fishImages = document.querySelectorAll(".image");
  console.log(fishImages);
  fishImages.forEach((image) => {
    image.addEventListener("click", handleImageClicks());
  });
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
  const footer = document.getElementById("footer");

  const btn = document.createElement("button");
  btn.setAttribute("class", "fish-button");
  btn.textContent = `${fish.common_name}`;
  footer.appendChild(btn);

  footer.appendChild;
}

//handlesClickEvent -- populates side tab and header bar
function handleImageClicks(e) {
  console.log(e.target);
  return e;
}
