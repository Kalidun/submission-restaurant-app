import RestaurantDbSource from "../../data/restaurantDb-source";
import UrlParser from "../../routes/url-parser";
import favoriteButtonInitiator from "../../utils/favorite-restaurant-initiator";
import RestaurantReviewInitiator from "../../utils/restaurant-review-initiator";
import { restaurantDetailTemplate } from "../templates/template-creator";

const Detail = {
  async render() {
    return `
      <section class="detail"></section>
      <section id="favoriteButtonContainer"></section>
    `
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

    const detailContainer = document.querySelector(".detail");
    detailContainer.innerHTML = restaurantDetailTemplate(restaurant);

    const favoriteButtonContainer = document.querySelector("#favoriteButtonContainer");

    favoriteButtonInitiator.init({
      favoriteButton: favoriteButtonContainer,
      restaurant: {
        id: restaurant.id,
      },
    });

    RestaurantReviewInitiator.init({
      form: document.querySelector("#reviewForm"),
      reviewContainer: document.querySelector("#reviewContainer"),
      restaurantId: {
        id: url.id,
      },
    });
  },
}

export default Detail