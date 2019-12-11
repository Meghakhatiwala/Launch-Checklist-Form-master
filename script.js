// Write your JavaScript code here!
window.addEventListener("load", function() {

   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {

      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let level = document.querySelector("input[name=fuelLevel]");
      let mass = document.querySelector("input[name=cargoMass]");

      if (pilot.value === "" || copilot.value === "" || level.value === "" || mass.value === "") {
           alert("All the values are required.");
           event.preventDefault();
           return;
      } 
         
      if(!isNaN(Number(pilot.value)) || !isNaN(Number(copilot.value))) {
           alert("Make sure to enter valid information for each field!");
           event.preventDefault();
           return;
      } 
         
      if (isNaN(level.value)) {
          alert("Please enter numeric value for Fuel Level.");
          event.preventDefault();
          return;
      }

      if (isNaN(mass.value)) {
         alert("Please enter numeric value for Cargo Mass.");
         event.preventDefault();
         return;
      }

      const pilotStatus = document.getElementById("pilotStatus");
      const copilotStatus = document.getElementById("copilotStatus");

      pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
      copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

      const statusCheck = document.getElementById("launchStatusCheck");
      const faultyItem = document.getElementById("faultyItems");
      const launchStatus = document.getElementById("launchStatus");
      const fuelStatus = document.getElementById("fuelStatus");
      const cargoStatus = document.getElementById("cargoStatus");
      
      let Ready = true;
      
      if (Number(level.value) < 10000) {
         Ready = false;
         faultyItem.style.visibility = "visible";
         fuelStatus.innerHTML = "Fuel level too low for launch";
         launchStatus.innerHTML = "Shuttle not ready for Launch";
         launchStatus.style.color = "Red";
      } else {
         fuelStatus.innerHTML = "Fuel level high enough for launch";
      }

      if (Number(mass.value) > 10000) {
         Ready = false;
         faultyItem.style.visibility = "visible";
         cargoStatus.innerHTML = "Cargo mass too high for launch";
         launchStatus.innerHTML = "Shuttle not ready for Launch";
         launchStatus.style.color = "Red";
      } else {
         cargoStatus.innerHTML = "Cargo mass low enough for launch";
      }

      if (!Ready) {
         event.preventDefault();
         return;      
      } else {
         faultyItem.style.visibility = "visible";
         launchStatus.innerHTML = "Shuttle ready for Launch";
         launchStatus.style.color = "Green";
         event.preventDefault();
      }
     
   });
   // This block of code shows how to format the HTML once you fetch some planetary JSON!
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         const div = document.getElementById("missionTarget");
         // Add HTML that includes the JSON data
         div.innerHTML = `<h2>Mission Destination</h2>
                          <ol>
                           <li>Name: ${json[0].name}</li>
                           <li>Diameter: ${json[0].diameter}</li>
                           <li>Star: ${json[0].star}</li>
                           <li>Distance from Earth: ${json[0].distance}</li>
                           <li>Number of Moons: ${json[0].moons}</li>
                          </ol>
                         <img src="${json[0].image}">`;
      });
   });
});
