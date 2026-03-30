const countriesContainer = document.querySelector(".countries");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const sortPopulation = document.getElementById("sortPopulation");

let countries = [];

// Collect data for the api
async function getCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,region,flags");

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        countries = Array.isArray(data) ? data : [];

        update();
    } catch (error) {
        console.log(error);
        countriesContainer.innerHTML = "<span>Failed to load data</span>";
    }
}

// Show the countries
function showCountries(list) {
    countriesContainer.innerHTML = "";

    if (list.length === 0) {
        countriesContainer.innerHTML = "<p>No countries found</p>";
        return;
    }

    list.forEach(c => {
        countriesContainer.innerHTML += `
            <div class="card">
                <img src="${c.flags.png}" width="100">
                <h3>${c.name.common}</h3>
                <p>Population: ${c.population.toLocaleString()}</p>
                <p>${c.region}</p>
            </div>
        `;
    });
}


function update() {
    let list = [...countries];

   // searching
    const search = searchInput.value.toLowerCase();
    if (search) {
        list = list.filter(c =>
            c.name.common.toLowerCase().includes(search)
        );
    }

    // filter region by region
    const region = regionFilter.value;
    if (region !== "all") {
        list = list.filter(c => c.region === region);
    }

    // sort by the population
    const sort = sortPopulation.value;
    if (sort === "asc") {
        list.sort((a, b) => a.population - b.population);
    } else if (sort === "desc") {
        list.sort((a, b) => b.population - a.population);
    }

    showCountries(list);
}


searchInput.addEventListener("input", update);
regionFilter.addEventListener("change", update);
sortPopulation.addEventListener("change", update);


getCountries();