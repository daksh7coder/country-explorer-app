const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("regionFilter");
const sortSelect = document.getElementById("sort");

let allCountries = [];

fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital")
  .then(response => response.json())
  .then(data => {
    allCountries = data;
    displayCountries(allCountries);
  })
  .catch(error => console.log(error));

function displayCountries(countries) {
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.png}" width="100">
      <p>Region: ${country.region}</p>
      <p>Population: ${country.population}</p>
    `;

    container.appendChild(card);
  });
}

// 🔍 Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(value)
  );

  displayCountries(filtered);
});

// 🌍 Filter
regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;

  if (region === "all") {
    displayCountries(allCountries);
  } else {
    const filtered = allCountries.filter(country =>
      country.region === region
    );
    displayCountries(filtered);
  }
});

// 🔤 Sort
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  let sortedCountries = [...allCountries];

  if (value === "asc") {
    sortedCountries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  } else if (value === "desc") {
    sortedCountries.sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
  }

  displayCountries(sortedCountries);
});