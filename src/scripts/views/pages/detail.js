import RestaurantDbSource from '../../data/restaurantDb-source';
import UrlParser from '../../routes/url-parser';
import favoriteButtonInitiator from '../../utils/favorite-restaurant-initiator';
import RestaurantReviewInitiator from '../../utils/restaurant-review-initiator';
import { restaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <section id="content" class="detail" style="min-height:86vh;"></section>
      <section id="favoriteButtonContainer"></section>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const favoriteButtonContainer = document.querySelector('#favoriteButtonContainer');
    const detailContainer = document.querySelector('.detail');

    if (restaurant == null) {
      detailContainer.innerHTML = '<h2 class="section-title">Failed to get Restaurant Detail while offline</h2>';
      return 0;
    }
    detailContainer.innerHTML = restaurantDetailTemplate(restaurant);

    favoriteButtonInitiator.init({
      favoriteButton: favoriteButtonContainer,
      restaurant: {
        id: restaurant.id,
      },
    });

    RestaurantReviewInitiator.init({
      form: document.querySelector('#reviewForm'),
      reviewContainer: document.querySelector('#reviewContainer'),
      restaurantId: {
        id: url.id,
      },
    });
  },
};

export default Detail;
