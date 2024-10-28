import "regenerator-runtime" /* for async await transpile */
import "../styles/main.css"

const loadingScreen = document.querySelector(".loading-screen")
const restaurantWrapper = document.querySelector(".restaurants-wrapper")
const topRestaurantWrapper = document.querySelector(".top-restaurant-wrapper")
const searchInput = document.querySelector(".search-bar input")
const sidebar = document.querySelector(".sidebar")
const toggleMenuButton = document.querySelectorAll(".toggle-menu")

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		loadingScreen.style.transform = "translateY(-100%)"
	}, 100)
})

async function loadData() {
	try {
		const response = await fetch("/data/DATA.json")
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error("Fetch error:", error)
	}
}
async function fetchData(search = "") {
	const data = await loadData()

	let filteredData = data.restaurants

	if (search) {
		filteredData = data.restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(search.toLowerCase()))
	}

	restaurantWrapper.innerHTML = ""
	filteredData.forEach((restaurant) => {
		const card = `
      <div class="restaurant-card" id="${restaurant.id}" tabindex="0" aria-label="Restaurant ${restaurant.name} di kota ${restaurant.city} dengan rating ${restaurant.rating}">
				<div class="restaurant-cover">
					<div class="restaurant-info">
						<div class="restaurant-city" aria-label="Kota ${restaurant.city}">
							<i class="fa-solid fa-location-dot"></i>
							${restaurant.city}
						</div>
						<div class="restaurant-rating" aria-label="Rating ${restaurant.rating}">
							<i class="fa-solid fa-star"></i>
							${restaurant.rating}
						</div>
					</div>
					<img src="${restaurant.pictureId}" class="restaurant-image" alt="Foto Restoran">
					<h2 class="restaurant-name" aria-label="Restaurant ${restaurant.name}">${restaurant.name}</h2>
				</div>
				<div class="restaurant-back">
					<h2 class="restaurant-name" aria-label="Restaurant ${restaurant.name}">${restaurant.name}</h2>
					<p class="restaurant-description" aria-label="Deskripsi Restoran ${restaurant.description}">${restaurant.description}</p>
				</div>
			</div>
    `

		restaurantWrapper.insertAdjacentHTML("beforeend", card)
	})

	topRestaurantWrapper.innerHTML = ""

	const topRestaurant = data.restaurants.sort((a, b) => b.rating - a.rating).slice(0, 3)

	topRestaurant.forEach((restaurant, index) => {
		const card = `
			<div class="top-restaurant-card" tabindex="0" aria-label="Restaurant Top ${restaurant.name}">
				<div class="top-restaurant-ranking" aria-label="Ranking ${index + 1}">
					#${index + 1}
				</div>
				<div class="top-restaurant-image" aria-label="Restaurant Top ${restaurant.name}">
					<img
						src="${restaurant.pictureId}"
						alt="topest restaurant"
						class="restaurant-image"
					/>
					<div class="top-restaurant-detail">
						<div class="restaurant-city" aria-label="Kota ${restaurant.city}">
							<i class="fa-solid fa-location-dot"></i>
							<span>${restaurant.city}</span>
						</div>
						<div class="restaurant-rating" aria-label="Rating ${restaurant.rating}">
							<i class="fa-solid fa-star"></i>
							<span>${restaurant.rating}</span>
						</div>
					</div>
				</div>
				<div class="top-restaurant-info">
					<h3 class="restaurant-name" aria-label="Restaurant Top ${restaurant.name}">${restaurant.name}</h3>
				</div>
			</div>
		`
		topRestaurantWrapper.insertAdjacentHTML("beforeend", card)
	})
}

searchInput.addEventListener("input", (e) => {
	const search = e.target.value
	fetchData(search)
})

fetchData()

toggleMenuButton.forEach((button) => {
	button.addEventListener("click", () => {
		if (sidebar.classList.contains("sidebar-show")) {
			sidebar.classList.remove("sidebar-show")
		} else {
			sidebar.classList.add("sidebar-show")
		}
	})
})
