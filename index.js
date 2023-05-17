document.addEventListener("DOMContentLoaded", function () {
  //API Endpoint to fetch fishes
  const fetchFishes = fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => parseFishData(data));

  const addToMyAquariumButton = document.getElementById("bigButtonOnHeader2");
  addToMyAquariumButton.addEventListener("click", handlesClickForAddButton);

  const resetButton = document.getElementById("bigButtonOnHeader1");
  resetButton.addEventListener("click", handlesClickForResetButton);

  const generateReportButton = document.getElementById("report-button");
  generateReportButton.addEventListener("click", handleClickForReportButton);
});

//invokes rendering from the API for initially loaded page
function parseFishData(data) {
  for (const item of data) {
    renderFishButtons(item);
    renderFishImageScroller(item);
  }
}

//creates button element and attaches event listener for each fish
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

//handles double-click event for fish buttons
function handlesDoubleClickForFishButtons(e) {
  const btn = e.target;
  btn.classList.toggle("selected");
}

//Handles the click event for the "Add to My Aquarium" button and adds selected fish to the aquarium
function handlesClickForAddButton(e) {
  const targets = document.querySelectorAll(".selected");

  for (const target of targets) {
    buildAquarium(target.textContent);
  }
  removeSelectedButtons();
}

function removeSelectedButtons() {
  const selected_fish = document.querySelectorAll(".selected");

  for (const target of selected_fish) {
    target.classList.remove("selected");
  }
}

//Removes the "selected" class from all fish buttons
//clears the Fish Pool in the footerDiv
//removes any reports
function handlesClickForResetButton() {
  removeSelectedButtons();

  const fish_pool = document.querySelectorAll(".addedFish");
  for (const target of fish_pool) {
    target.remove();
  }

  const report = document.querySelector(".report");
  if (report !== null) {
    report.remove();
  }
}

//removes corresponding fish from fish pool
function handleClickForXButtons(e) {
  const target = e.target;
  const p = target.parentNode;
  p.remove();
}

//triggers generateReport
function handleClickForReportButton(e) {
  const addedFish = document.getElementsByClassName("addedFish");
  const fishNames = Array.from(addedFish).map((p) => {
    return p.textContent.split("   ")[0];
  });

  if (document.querySelector(".report") === null) {
    if (fishNames.length === 0) {
      noReport();
    } else {
      generateReport(fishNames);
    }
  }
}

//fetches object with matching common_name
function fetchFish(name) {
  return fetch("http://localhost:3000/fish")
    .then((res) => res.json())
    .then((data) => data.find((elem) => elem.common_name === name));
}

//populates the compatibility guide with relevant for fish
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

// Updates the fish image displayed in the image scroller based on the selected fish
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

//Builds a paragraph element with a fish name and delete button, and adds it to the aquarium
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

//Generates an HTML section with a report containing tips
function generateReport(fishes) {
  const main = document.querySelector("main");
  const reportSection = document.createElement("section");
  reportSection.setAttribute("class", "report");

  main.appendChild(reportSection);

  const h2 = document.createElement("h2");
  h2.textContent = "Report: Tips for Your Aquarium!";
  reportSection.appendChild(h2);

  const hr = document.createElement("hr");
  reportSection.appendChild(hr);

  const p2 = document.createElement("p");
  p2.textContent = `Adding ${fishes.length} fishes to your Aquarium Project is a big start! Treat them all responsibly!`;
  reportSection.appendChild(p2);

  const hr2 = document.createElement("hr");
  reportSection.appendChild(hr2);

  const p = document.createElement("p");
  p.textContent =
    "The cost of starting an aquarium can vary depending on the size and complexity of the setup. On average, a basic setup for a decent aquarium can cost around $300-$500, including essentials such as a tank, filter, heater, and lighting. Additional costs may include gravel or substrate, decorations, water conditioner, and fish food.";
  reportSection.appendChild(p);

  const p1 = document.createElement("p");
  p1.textContent =
    "It's important to consider ongoing costs for regular maintenance, such as water testing kits, replacement filter media, and potential veterinary care for the fish. Researching specific requirements for the type of fish you plan to keep and consulting with experienced aquarists can help you determine the necessary supplies and costs for your aquarium setup.";
  reportSection.appendChild(p1);
}

//Generates an HTML section indicating that no fish have been selected for the report.
function noReport() {
  const main = document.querySelector("main");
  const reportSection = document.createElement("section");
  reportSection.setAttribute("class", "report");
  main.appendChild(reportSection);

  const h2 = document.createElement("h2");
  h2.textContent = "Report: No Fish Selected!";
  reportSection.appendChild(h2);

  const hr = document.createElement("hr");
  reportSection.appendChild(hr);

  const p2 = document.createElement("p");
  p2.textContent = "Do not forget to select 'Add To Fish Pool'";
  reportSection.appendChild(p2);
}
