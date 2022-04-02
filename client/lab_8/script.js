function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

// Data Handler
function dataHandler(dataArray) {
  // console.log('fired dataHandler');
  // console.table(dataArray)
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
    // console.log(listItems)
  return listItems;
}

function createHtmlList(collection) {
  // console.log('fired HTML creator');
  // console.log(collection);
  const targetList = document.querySelector('.resto-list');
  // console.log(targetList)
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}

// Main function
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap();
  submit.style.display = 'none';

  // const results = await fetch('/api/foodServicesPG');
  // const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  // const arrayFromJson = await results.json();
  // console.log(arrayFromJson);

  const arrayFromJson = {data: []};

  if (arrayFromJson.length > 0) {
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {
        return;
      }

      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });

      console.log(selectResto);
      createHtmlList(selectResto);
    });

    zipcode.addEventListener('input', async (events) => {
      console.log(events.target.value);

      if (currentArray.length < 1) {
        return;
      }

      const selectZip = currentArray.filter((item) => item.zip.includes(events.target.value));

      console.log(selectZip);
      createHtmlList(selectZip);
    });

    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      // console.log('form submission');
      currentArray = dataHandler(arrayFromJson);
      console.log(currentArray);
      createHtmlList(currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests