import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(data) {
    this._restaurant = data;
    this._render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _render() {
    this._emptyContent();

    this.innerHTML = `
      <div class="restaurant-card" id="${this._restaurant.id}" tabindex="0" aria-label="Restaurant ${this._restaurant.name} di kota ${this._restaurant.city} dengan rating ${this._restaurant.rating}">
        <div class="restaurant-card-cover">
          <div class="restaurant-card-info">
            <div class="restaurant-card-city" aria-label="Kota ${this._restaurant.city}">
              <i class="fa-solid fa-location-dot"></i>
              ${this._restaurant.city}
            </div>
            <div class="restaurant-card-rating" aria-label="Rating ${this._restaurant.rating}">
              <i class="fa-solid fa-star"></i>
              ${this._restaurant.rating}
            </div>
          </div>
          <img src="${API_ENDPOINT.GET_RESTAURANT_PICTURE(this._restaurant.pictureId)}" class="restaurant-card-image" alt="Foto Restoran">
          <h2 class="restaurant-card-name" aria-label="Restaurant ${this._restaurant.name}">${this._restaurant.name}</h2>
        </div>
        <div class="restaurant-card-back">
          <h2 class="restaurant-card-name" aria-label="Restaurant ${this._restaurant.name}">${this._restaurant.name}</h2>
          <p class="restaurant-card-description" aria-label="Deskripsi Restoran ${this._restaurant.description}">${this._restaurant.description}</p>
          <a href="#/detail/${this._restaurant.id}" class="restaurant-card-button" aria-label="Detail Restoran ${this._restaurant.name}">Detail</a>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
