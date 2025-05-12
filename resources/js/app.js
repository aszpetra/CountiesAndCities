import "./bootstrap";
import axios from "axios";

//Query the cities in db by county
async function getCities(countyId) {
  try {
    const response = (await axios.get(`/${countyId}/cities`)).data;
    return response;
  } catch (error) {
    console.error("Hiba a városok lekérésekor:", error);
    cityList.innerHTML = "<p>Hiba történt a városok betöltésekor.</p>";
    return {};
  }
}

//Creating new city in db
async function createCity(cityName, countyId) {
  const config = {
    headers: {
      Accept: "application/javascript",
    },
  };
  try {
    const response = (
      await axios.post(
        "/cities",
        {
          name: cityName,
          county_id: countyId,
        },
        config
      )
    ).data;

    return response;
  } catch (error) {
    console.error("Hiba a város hozzáadásakor:", error);
    alert("Nem sikerült hozzáadni a várost.");
    return {};
  }
}

//Handles click event on form submit (add new city)
async function handleSubmit(event) {
  event.preventDefault();

  const cityName = document.getElementById("city-name").value;
  const countyId = document.getElementById("county-select").value;

  await createCity(cityName, countyId);
  await listCities(countyId);

  document.getElementById("city-name").value = "";
}

//Updating the city name
async function cityUpdate(newName, city) {
  try {
    await axios.put(`/cities/${city.id}`, {
      name: newName,
    });
  } catch (error) {
    console.error(error);
    alert("Hiba a módosítás során.");
  }
}

//Deleting the city
async function cityDelete(city) {
  try {
    await axios.delete(`/cities/${city.id}`);
  } catch (error) {
    console.error(error);
    alert("Hiba a törlés során.");
  }
}

//Adding the buttons and their functions to the city name
async function cityOnClick(wrapper, span, city) {
  span.style.display = "none";
  const input = document.createElement("input");
  input.type = "text";
  input.value = city.name;

  const updateBtn = document.createElement("button");
  updateBtn.classList.add("city-btn");
  updateBtn.textContent = "Módosítás";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("city-btn");
  deleteBtn.textContent = "Törlés";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("city-btn");
  cancelBtn.textContent = "Mégsem";

  wrapper.appendChild(input);
  wrapper.appendChild(updateBtn);
  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(cancelBtn);

  updateBtn.addEventListener("click", async function () {
    const newName = input.value;
    await cityUpdate(newName, city);
    span.textContent = newName;
    span.style.display = "inline";
    cleanup();
  });

  deleteBtn.addEventListener("click", async function () {
    await cityDelete(city);
    wrapper.remove();
  });

  cancelBtn.addEventListener("click", async function () {
    span.style.display = "inline";
    cleanup();
  });

  function cleanup() {
    input.remove();
    updateBtn.remove();
    deleteBtn.remove();
    cancelBtn.remove();
  }
}

//Creating the interactive city name
async function interactiveCityElement(city) {
  const cityList = document.getElementById("city-list");
  const wrapper = document.createElement("div");
  wrapper.classList.add("items");
  wrapper.classList.add("city-wrapper");
  wrapper.style.cursor = "pointer";

  const span = document.createElement("span");
  span.textContent = city.name;
  span.classList.add("city-name");

  wrapper.appendChild(span);
  cityList.appendChild(wrapper);

  span.addEventListener("click", function () {
    cityOnClick(wrapper, span, city);
  });
}

//Listing the cities by selected county
async function listCities(countyId) {
  const cityList = document.getElementById("city-list");
  cityList.innerHTML = "";
  const response = await getCities(countyId);

  if (response.length > 0) {
    response.forEach(function (city) {
      interactiveCityElement(city);
    });
  } else {
    cityList.innerHTML = "<p>Ehhez a megyéhez nincs még város hozzáadva.</p>";
  }
}

document.getElementById("county-select")
  .addEventListener("change", async function () {
    const countyId = this.value;
    const cityForm = document.getElementById("city-form");
    const formDiv = document.getElementById("form-div");
    const cityList = document.getElementById("city-list");

    //If a county is selected
    if (countyId) {
      cityForm.style.display = "block";
      formDiv.style.display = "block";
      cityList.style.display = "block";

      //Listing the cities in selected counties
      await listCities(countyId);
    } else {
      cityForm.style.display = "none";
      cityList.style.display = "none";
    }
});

document.getElementById("city-form").addEventListener("submit", handleSubmit);
