let allPokemonButton = document.getElementById('catchAll'); // get Button element
let pokeList = document.querySelector('section#results'); // get Section for pokemon list
// let listContainer = document.createElement('ul');
// pokeList.appendChild(listContainer).setAttribute('id', 'list-container');
// console.log(pokeList);
let searchInput = document.querySelector('#search');
let searchButton = document.querySelector('#searchButton');
let filterDropdown = document.querySelector('select');
let pokePage = 0;
console.log(filterDropdown);

allPokemonButton.addEventListener('click', (event) => {
    event.preventDefault();
    axios({
        url: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokePage}`,
        method: 'get'
    })
    .then((response) => {
        console.log(response);
        let pokeArray = response.data.results;
        pokeList.innerText = "";
        pokeArray.forEach(pokemon => {
            // console.log(pokemon.name);
            let newPokemon = document.createElement('div');
            newPokemon.classList.add('col');
            if (pokeArray.indexOf(pokemon) % 4 === 0) {
                let lineBreak = document.createElement('div');
                lineBreak.classList.add('w-100');
                pokeList.appendChild(lineBreak);
            }
                axios({
                    url: pokemon.url,
                    method: 'get'
                })
                .then((response) => {
                    console.log(response);
                    let pokeSprite = response.data.sprites.front_default;
                    let newSprite = document.createElement('img');
                    newSprite.src = pokeSprite;
                    newPokemon.appendChild(newSprite);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
            newPokemon.innerText = `${pokemon.name}`;
            pokeList.appendChild(newPokemon);
        })
    })
    pokePage += 20;
})

searchButton.addEventListener('click', () => {
    let value = searchInput.value;
    let filter = filterDropdown.value;
    pokeList.innerText = "";
    axios({
        url: `https://pokeapi.co/api/v2/${filter}/${value}`,
        method: 'get'
    })
    .then((response) => {
        console.log(response);
        if (filter === "pokemon") {
            let filteredResult = document.createElement('div');
            filteredResult.classList.add('col');
            let pokeSprite = response.data.sprites.front_default;
            let newSprite = document.createElement('img');
            newSprite.src = pokeSprite;
            filteredResult.innerText = `${response.data.name}`;
            filteredResult.appendChild(newSprite);
            pokeList.appendChild(filteredResult);
        } else {
            let filteredResult = document.createElement('div');
            filteredResult.classList.add('col');
            filteredResult.innerText = `${response.data.name}`;
            pokeList.appendChild(filteredResult);
        }
    })
    .catch((error) => {
        console.log(error);
        alert('Oops! No matches found!')
    })
})