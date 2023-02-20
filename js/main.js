const API_URL = 'https://majazocom.github.io/Data/solaris.json';

getPlanets();

function getPlanets() {
    fetch(API_URL)
    .then(respons => respons.json())
    .then(data => renderPlanetsToUI(data));
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
    });
}