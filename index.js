document.addEventListener("DOMContentLoaded", function () {
  //API Endpoint to
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));

  const addToMyAquariumButton = document.getElementById("bigButtonOnHeader2");
  addToMyAquariumButton.addEventListener("click", handlesClickForAddButton);

  const resetButton = document.getElementById("bigButtonOnHeader1");
  resetButton.addEventListener("click", handlesClickForResetButton);

  // const xbuttons = document.querySelectorAll("X");
  // for (btn of xbuttons) {
  //   btn.addEventListener("click", handleClickForXButtons);
  // }
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
  btn.addEventListener("dblclick", handlesDoubleClickForFishButtons);
  header.appendChild(btn);
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

function handlesDoubleClickForFishButtons(e) {
  // adds .selected class
  const btn = e.target;

  if (btn.classList.contains("selected")) {
    console.log("should be removing");
    btn.classList.remove("selected");
  } else {
    btn.classList.add("selected");
  }
}

function handlesClickForAddButton(e) {
  //sends list of selected elements to footer
  const targets = document.querySelectorAll(".selected");

  for (const target of targets) {
    //console.log(target);
    buildAquarium(target.textContent);
  }
}

function handlesClickForResetButton() {
  //removes .selected class from all selected buttons
  const targets = document.querySelectorAll(".selected");

  for (const target of targets) {
    target.classList.remove("selected");
  }
}

function handleClickForXButtons(e) {
  //deletes p element // parent node
  const target = e.target;
  const p = target.parentNode;
  p.remove();
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

function buildAquarium(fishName) {
  const footer = document.getElementById("footer");

  const p = document.createElement("p");
  p.setAttribute("class", "addedFish");

  const btn = document.createElement("button");
  btn.setAttribute("class", "X");
  btn.addEventListener("click", handleClickForXButtons);

  p.textContent = `${fishName}   `;
  btn.textContent = "x";

  p.appendChild(btn);
  footer.appendChild(p);
}
