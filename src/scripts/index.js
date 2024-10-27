import "regenerator-runtime" /* for async await transpile */
import "../styles/main.css"

const loadingScreen = document.querySelector(".loading-screen")
const restaurantWrapper = document.querySelector(".restaurants-wrapper")

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		loadingScreen.style.transform = "translateY(-100%)"
	}, 100)
})

async function loadData() {
	try {
		const response = await fetch("/data/DATA.json");
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
	}
}
async function fetchData() {
	const data = await loadData();
  console.log(data.restaurants);
  data.restaurants.forEach(restaurant => {
    const card = `
      <div class="restaurant-card" id="${restaurant.id}">
				<div class="restaurant-cover">
					<div class="restaurant-info">
						<div class="restaurant-city">
							<i class="fa-solid fa-location-dot"></i>
							${restaurant.city}
						</div>
						<div class="restaurant-rating">
							<i class="fa-solid fa-star"></i>
							${restaurant.rating}
						</div>
					</div>
					<img src="${restaurant.pictureId}" class="restaurant-image" alt="Foto Restoran">
					<h2 class="restaurant-name">${restaurant.name}</h2>
				</div>
				<div class="restaurant-back">
					<h2 class="restaurant-name">${restaurant.name}</h2>
					<p class="restaurant-description">${restaurant.description}</p>
				</div>
			</div>
    `

		restaurantWrapper.insertAdjacentHTML("beforeend", card);
  });
}

fetchData();
