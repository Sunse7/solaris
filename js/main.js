const API_URL = 'https://majazocom.github.io/Data/solaris.json';
let errorMessageEl = document.querySelector('.error-msg');
let planetArray = [];

if (window.location.href.includes('planet-info')) {
    getPlanetsAndPushToArray();
    renderSelectedPlanetToUI();
} else {
    getPlanets();
}

function getPlanetsAndPushToArray() {
        fetch(API_URL)
        .then(respons => respons.json())
        .then(data => {
            data.forEach(planet => {
                planetArray.push(planet);
            })
        });
}

function getPlanets() {
        fetch(API_URL)
        .then(respons => respons.json())
        .then(data => {
        //    getPlanetsAndPushToArray(); //Needed?
            renderPlanetsToUI(data);
            searchPlanet(data);
        });
}

function renderPlanetsToUI(planets) {
    let planetsContainerEl = document.querySelector('.planets-container');
    planets.forEach(planet => {
        let planetBoxEl = document.createElement('article');
        planetBoxEl.innerHTML = `
        <p>${planet.name}</p>
        <div class="${planet.name.toLowerCase()}"></div>
        `;
        planetsContainerEl.appendChild(planetBoxEl);
        onPlanetClick(planetBoxEl, planet);
    });  
}

function onPlanetClick(element, item) {
    element.addEventListener('click', () => {
        localStorage.setItem('currentPlanet', JSON.stringify(item));
        window.location.href = 'planet-info.html';
    });
}

function searchPlanet(planets) {
    let searchInputEl = document.querySelector('#search-input');
    let searchButton = document.querySelector('#search-btn');

    searchButton.addEventListener('click', () => {
        let showResultEl = document.querySelector('.show-result');
        let searchInput = searchInputEl.value;
        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase() === searchInput.toLowerCase()); 
        try {
            showResultEl.style.color = 'white';
            showResultEl.href = 'planet-info.html';
            showResultEl.innerHTML = `Take me to: ${planets[planetIndex].name}`;
            onPlanetClick(showResultEl, planets[planetIndex]);
        } catch {
            showResultEl.style.color = 'red';
            showResultEl.innerHTML = `That is not a planet :( <br>
                Try again`;
        } 
    });
}

function renderSelectedPlanetToUI() {
    let planetNameEl = document.querySelector('.planet--name');
    let planetLatinNameEl = document.querySelector('.planet--latin-name');
    let planetDescriptionEl = document.querySelector('.planet--description');
    let planetCircumferenceEl = document.querySelector('.planet--circumference');
    let planetDistanceEl = document.querySelector('.planet--distance');
    let planetMaxTempEl = document.querySelector('.planet--max-temp');
    let planetMinTempEl = document.querySelector('.planet--min-temp');
    let planetMoonsEl = document.querySelector('.planet--moons');

    try {
        let planetToShow = JSON.parse(localStorage.getItem('currentPlanet'));
        planetNameEl.innerHTML = `${planetToShow.name}`;
        planetLatinNameEl.innerHTML = `${planetToShow.latinName}`;
        planetDescriptionEl.innerHTML = `${planetToShow.desc}`;
        planetCircumferenceEl.innerHTML = `${planetToShow.circumference}`;
        planetDistanceEl.innerHTML = `${planetToShow.distance} km`;
        planetMaxTempEl.innerHTML = `${planetToShow.temp.day}`;
        planetMinTempEl.innerHTML = `${planetToShow.temp.night}`;
        planetMoonsEl.innerHTML = `${planetToShow.moons}`; //Loop?

        onNextPlanetClick(planetToShow);
        onPreviousPlanetClick(planetToShow);
    } catch {
        errorMessageEl.innerHTML = 'No planet found :( <br> Go back to all planets';
    }
}

function onPreviousPlanetClick(currentPlanet) {
    let prevEl = document.querySelector('.pagination--previous');
    prevEl.addEventListener('click', () => {
        let index = planetArray.findIndex(p => p.id === currentPlanet.id);
        localStorage.setItem('currentPlanet', JSON.stringify(planetArray[index -1]))
    });
}

function onNextPlanetClick(currentPlanet) {
    let nextEl = document.querySelector('.pagination--next');
    nextEl.addEventListener('click', () => {
        let index = planetArray.findIndex(p => p.id === currentPlanet.id);
        localStorage.setItem('currentPlanet', JSON.stringify(planetArray[index + 1]))
    });
}