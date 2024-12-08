import { createFavoriteButtonTemplate, createUnfavoriteButtonTemplate } from "../views/templates/template-creator";
import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";
const favoriteButtonInitiator = {
  async init({ favoriteButton, restaurant }) {
    this._favoriteButton = favoriteButton;
    this._restaurant = restaurant;

    await this._renderButton();
  },
  async _renderButton() {
    const { id } = this._restaurant;

    if(await this._isRestaurantExist(id)){
      this._renderFavoriteButton();
    } else {
      this._renderUnfavoriteButton();
    }
  },
  async _isRestaurantExist(id){
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
  _renderFavoriteButton() {
    this._favoriteButton.classList.add("favorite");
    this._favoriteButton.innerHTML = createFavoriteButtonTemplate();
    this._favoriteButton.addEventListener("click", async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
  _renderUnfavoriteButton() {
    this._favoriteButton.classList.remove("favorite");
    this._favoriteButton.innerHTML = createUnfavoriteButtonTemplate();
    this._favoriteButton.addEventListener("click", async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  }
}

export default favoriteButtonInitiator