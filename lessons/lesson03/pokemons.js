const url = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url) {
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        doStuff(data);
    }
}

function doStuff(data) {
    const outputElement = document.querySelector("#output");
    results = data;
    const totalCount = results.count;
    const limit = results.results.length;

    const selectElement = document.createElement('select');
    results.results.forEach((pokemon) => {
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        selectElement.appendChild(option);
    });

    outputElement.innerHTML = `
        <h2>Total Pokémon Records Count: ${totalCount}</h2>
        <h3>Number of Pokémon Records Returned by Default: ${limit}</h3>
    `;
    outputElement.appendChild(selectElement);

    console.log("first: ", results);
}

getPokemon(url);
console.log("second: ", results);
