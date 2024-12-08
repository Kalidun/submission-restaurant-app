import RestaurantDbSource from '../data/restaurantDb-source';

const SearchInitiator = {
  init({ searchInput, restaurantContainer }){
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;

      this._searchRestaurants(query, restaurantContainer);
    });
  },

  async _searchRestaurants(query, restaurantContainer) {
    const restaurants = await RestaurantDbSource.allRestaurants();

    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(query.toLowerCase());
    });

    restaurantContainer.innerHTML = '';

    filteredRestaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      restaurantContainer.appendChild(restaurantCard);
    });
  }
};

export default SearchInitiator;