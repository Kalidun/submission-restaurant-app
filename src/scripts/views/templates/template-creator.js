import API_ENDPOINT from '../../globals/api-endpoint';

const restaurantDetailTemplate = (restaurant) => {
  return `
  <div class="restaurant-detail-wrapper">
	  <h2 class="restaurant-name">${restaurant.name}</h2>
	  <div class="restaurant-detail">
	  	<img src="${API_ENDPOINT.GET_RESTAURANT_PICTURE(restaurant.pictureId)}" class="restaurant-image" />
      <div class="restaurant-info">
        <div class="restaurant-rating">Rating : <i class="fa-solid fa-star"></i>${restaurant.rating}</div>
        <div class="restaurant-city">Kota : ${restaurant.city}</div>
        <div class="restaurant-address">Alamat : ${restaurant.address}</div>
        <div class="restaurant-description">
        <p>Deskripsi :</p>
        ${restaurant.description}
        </div>
      </div>
	  </div>
    <div class="restaurant-menu">
      <h3 class="restaurant-menu-title">Menu</h3>
      <div class="restaurant-menu-list">
        <ol class="restaurant-menu-food">
          <h4 class="restaurant-menu-food-title">Makanan</h4>
        ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ol>
        <ol class="restaurant-menu-drink">
          <h4 class="restaurant-menu-drink-title">Minuman</h4>
        ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ol>
      </div>
    </div>
    <div class="restaurant-review">
      <h3 class="restaurant-review-title">Review</h3>
      <div class="restaurant-review-body">
        <form class="restaurant-review-form" id="reviewForm">
          <input type="text" id="name" placeholder="Nama" required />
          <input type="text" id="review" placeholder="Review" required></input>
          <button type="submit">Kirim</button>
        </form>
        <div class="restaurant-review-list" id="reviewContainer">
        ${restaurant.customerReviews
    .map(
      (review) => `
          <div class="restaurant-review-item">
            <div class="restaurant-review-header">
              <div class="restaurant-review-name">${review.name}</div>
              <div class="restaurant-review-date">${review.date}</div>
            </div>
            <div class="restaurant-review-content">
            ${review.review}
            </div>
          </div>
          `,
    )
    .join('')}
        </div>
      </div>
    </div>
  </div>
  `;
};

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa-solid fa-star" aria-hidden="true"></i>  
  </button>
`;

const createUnfavoriteButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa-regular fa-star" aria-hidden="true"></i>
  </button>
`;

export { restaurantDetailTemplate, createFavoriteButtonTemplate, createUnfavoriteButtonTemplate };
