
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';


const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birth = document.createElement('p');
        let place = document.createElement('p');
        let portrait = document.createElement('img');


        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birth.textContent = `Date of birth: ${prophet.birthdate}`;
        place.textContent = `Place of birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birth);
        card.appendChild(place);
        card.appendChild(portrait);


        cards.appendChild(card);
    });
}