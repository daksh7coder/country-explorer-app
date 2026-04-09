const container = document.getElementById("countries-container");

fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital")
  .then(response => response.json())
  .then(data => {
    displayCountries(data);
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