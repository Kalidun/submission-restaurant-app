import RestaurantDbSource from "../../data/restaurantDb-source"

const Home = {
	async render() {
		return `
      <section class="jumbotron">
				<img src="./images/heros/hero-image_2.jpg" alt="Pemandangan restaurant" class="jumbotron-image" />
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
		const restaurants = await RestaurantDbSource.allRestaurants()
		const restaurantsContainer = document.querySelector(".restaurants-wrapper")

		restaurants.forEach((restaurant) => {
			const restaurantCard = document.createElement("restaurant-card")
			restaurantCard.restaurant = restaurant
			restaurantsContainer.appendChild(restaurantCard)
		})
	},
}

export default Home
