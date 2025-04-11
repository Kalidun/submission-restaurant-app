import RestaurantDbSource from "../../data/restaurantDb-source"
import SearchInitiator from "../../utils/search-initiator"

const Home = {
	async render() {
		return `
      <section class="jumbotron">
        <picture style="width: 100vw">
          <source style="width: 100vw" media="(max-width: 600px)" srcset="/images/heros/hero-image_2.jpg">
          <img style="width: 100vw" src="/images/heros/hero-image_2.jpg" ...>
        </picture>
			</section>

			<section class="restaurants" id="content">
				<h2 class="section-title">Explore Our Restaurant</h2>
				<div class="search-bar">
					<input type="text" class="search" placeholder="Search Restaurant" id="searchRestaurant" />
				</div>
				<div class="restaurants-wrapper"></div>
			</section>
    `
	},
	async afterRender() {
		const restaurantsContainer = document.querySelector(".restaurants-wrapper")
		const restaurants = await RestaurantDbSource.allRestaurants()

		if (restaurants == null) {
			restaurantsContainer.innerHTML = '<h2 class="section-title">Failed to get Restaurants data while ofline</h2>'
			restaurantsContainer.style.gridTemplateColumns = "1fr"
			return 0
		}

		restaurants.forEach((restaurant) => {
			const restaurantCard = document.createElement("restaurant-card")
			restaurantCard.restaurant = restaurant
			restaurantsContainer.appendChild(restaurantCard)
		})

		SearchInitiator.init({
			searchInput: document.querySelector("#searchRestaurant"),
			restaurantContainer: document.querySelector(".restaurants-wrapper"),
		})
	},
}

export default Home
