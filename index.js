document.addEventListener("DOMContentLoaded", function () {
  //API Endpoint to
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));
});

function parseFishData(data) {
  for (const item of data) {
    renderFishButtons(item);
    renderFishImageScroller(item);
  }
}

//creates button with an event listener for each fish
function renderFishButtons(fish) {
  const header = document.getElementById("middleAreaH");

  const btn = document.createElement("button");
  btn.setAttribute("class", "fish-button");
  btn.textContent = `${fish.common_name}`;
  btn.addEventListener("click", handlesClickForFishButtons);
  header.appendChild(btn);
  header.appendChild;
}

//renders image for every fish inside of a scroller
function renderFishImageScroller(fish) {
  const scroller = document.querySelector("#fishPool .content");

  const image = document.createElement("img");
  image.src = fish.img;
  image.setAttribute("class", "image");
  scroller.appendChild(image);
}

//handles the click event
function handlesClickForFishButtons(e) {
  const name = e.target.textContent;
  buildGuide(name);
  selectImage(name);
}

//fetches object with matching common_name
function fetchFish(name) {
  return fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => data.find((elem) => elem.common_name === name));
}

//populates the compatibility guide with relative info from DB
function buildGuide(fishName) {
  fetchFish(fishName).then((fish) => {
    const h2 = document.getElementById("title");
    h2.textContent = `${fish.common_name}`;

    const scientific_name = document.getElementById("ScientificName");
    scientific_name.textContent = `Scientific Name: ${fish.scientific_name}`;

    const behavior = document.getElementById("Behavior");
    behavior.textContent = `Typical Behavior: ${fish.behavior}`;

    const length = document.getElementById("Length");
    length.textContent = `Max Length: ${fish.longest_average_length_inches} inches`;

    const water_con = document.getElementById("Water_Con");
    water_con.textContent = ` Water Condition Ranges - Temp: ${fish.water_conditions.temperature} | pH: ${fish.water_conditions.pH} | Water Hardness: ${fish.water_conditions.water_hardness}`;
  });
}

// Removes the initialized scroller and fixes to image of fish
function selectImage(fishName) {
  fetchFish(fishName).then((fish) => {
    const scroller = document.getElementById("scroller");
    while (scroller.firstChild) {
      scroller.removeChild(scroller.firstChild);
    }

    const img = document.createElement("img");
    img.src = fish.img;
    scroller.appendChild(img);
  });
}
