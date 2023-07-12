// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  let id = document.getElementById("missionTarget");
  id.innerHTML = ` <h2>Mission Destination</h2>
                <ol>
                    <li>Name:${name}</li>
                    <li>Diameter:${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance}</li>
                    <li>Number of Moons:${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  let result;
  if (testInput.length === 0) {
    return "Empty";
  }
  if (!isNaN(parseInt(testInput))) {
    result = "Is a Number";
  } else if (isNaN(parseInt(testInput)) && typeof testInput === "string") {
    result = "Not a Number";
  }
  return result;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let errMessage = "";
  let indicator = "true";
  let validatePilot = validateInput(pilot);
  let validateCopilot = validateInput(copilot);
  let validateFuelLevel = validateInput(fuelLevel);
  let validateCargoLevel = validateInput(cargoLevel);
  if (
    validatePilot === "Empty" ||
    validateCopilot === "Empty" ||
    validateFuelLevel === "Empty" ||
    validateCargoLevel === "Empty"
  ) {
    errMessage = "All fields are required!!";
    console.log(errMessage);
  }
  if (
    (validatePilot !== "Not a Number" && validatePilot != "Empty") ||
    (validateCopilot !== "Not a Number" && validateCopilot != "Empty") ||
    (validateFuelLevel !== "Is a Number" && validateFuelLevel != "Empty") ||
    (validateCargoLevel !== "Is a Number" && validateCargoLevel != "Empty")
  ) {
    errMessage =
      errMessage + "\nMake sure to enter valid information for each field!!";
    console.log(errMessage);
  }
  if (errMessage.length != 0) {
    alert(errMessage);
  } else {
    let statusId = document.getElementById("launchStatus");
    list.style.visibility = "visible";
    document.getElementById(
      "pilotStatus"
    ).innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById(
      "copilotStatus"
    ).innerHTML = `Co-pilot ${copilot} is ready for launch`;
    if (fuelLevel < 10000) {
      document.getElementById(
        "fuelStatus"
      ).innerHTML = `Fuel level too low for launch`;
      indicator = "fuelfalse";
    } else {
      document.getElementById(
        "fuelStatus"
      ).innerHTML = `Fuel level high enough for launch`;
    }
    if (cargoLevel >= 10000) {
      document.getElementById(
        "cargoStatus"
      ).innerHTML = `Cargo mass too heavy for launch`;
      indicator = "cargofalse";
    } else {
      document.getElementById(
        "cargoStatus"
      ).innerHTML = `Cargo mass low enough for launch`;
    }
    if (indicator === "true") {
      statusId.innerHTML = `Shuttle is Ready for Launch`;
      statusId.style.color = "#419F6A";
    } else {
      statusId.innerHTML = `Shuttle Not Ready for Launch`;
      if (indicator === "cargofalse") {
        statusId.style.color = "#C7254E";
      }
      if (indicator === "fuelfalse") {
        statusId.style.color = "rgb(199, 37, 78)";
      }
    }
  }
}

async function myFetch() {
  let planetsReturned;
  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * 6);
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
