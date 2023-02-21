const API_URL = 'https://majazocom.github.io/Data/solaris.json';


getPlanets();

function getPlanets() {
    fetch(API_URL)
    .then(respons => respons.json())
    .then(data => {
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
        console.log(`Wow ${item.name}`);
        try {
            renderSelectedPlanetToUI();
        } catch (e) {
            console.log(e);
        }
    });
}

function searchPlanet(planets) {
    let searchInputEl = document.querySelector('#search-input');
    let searchButton = document.querySelector('#search-btn');

    searchButton.addEventListener('click', () => {
        let showResultEl = document.querySelector('.show-result');
        let searchInput = searchInputEl.value;
        console.log(searchInput);

        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase() === searchInput.toLowerCase()); 
        try {
            showResultEl.style.color = 'white';
            showResultEl.href = 'planet-info.html';
            showResultEl.innerHTML = `Take me to: ${planets[planetIndex].name}`;
            localStorage.setItem('currentPlanet', JSON.stringify(planets[planetIndex]));
            onPlanetClick(showResultEl);
        } catch (e) {
            console.log(e);
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

    let planetToShow = JSON.parse(localStorage.getItem('currentPlanet'));
    console.log(planetToShow);
    planetNameEl.innerHTML = `${planetToShow.name}`;
}