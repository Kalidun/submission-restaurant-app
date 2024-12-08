import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import RestaurantDbSource from '../../data/restaurantDb-source';

const Favorite = {
  async render() {
    return `
      <div class="restaurants" style="min-height:86vh;">
        <div class="restaurants-wrapper" id="content"></div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantIds = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#content');

    if (restaurantIds.length > 0) {
      const restaurantDetails = await Promise.all(
        restaurantIds.map((id) => RestaurantDbSource.detailRestaurant(id.id))
      );

      restaurantDetails.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantsContainer.appendChild(restaurantCard);
      });
    } else {
      document.querySelector('.restaurants').innerHTML = `
        <h2 class="section-title">Favorite Restaurant Not Found</h2>
      `;
    }
  },
};

export default Favorite;
