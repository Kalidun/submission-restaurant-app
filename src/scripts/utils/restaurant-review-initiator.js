import API_ENDPOINT from "../globals/api-endpoint";

const RestaurantReviewInitiator = {
  init({ form, restaurantId, reviewContainer }) {
    this._form = form;
    this._restaurantId = restaurantId;
    this._reviewContainer = reviewContainer;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._onSubmit();
    });
  },

  async _onSubmit(){
    const name = this._form.elements['name'].value;
    const review = this._form.elements['review'].value;
    const id = this._restaurantId.id;

    if (!name || !review) {
      alert('Review tidak boleh kosong!');
      return;
    }

    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, review }),
    });

    if (!response.ok) {
      alert('Gagal menambahkan review!');
      console.log(response);
      return;
    }

    this._form.reset();
    const data = await response.json();
    this._renderReview(data.customerReviews);
  },

  _renderReview(review){
    this._reviewContainer.innerHTML = '';
    review.forEach((review) => {
      this._reviewContainer.innerHTML += `
          <div class="restaurant-review-item">
            <div class="restaurant-review-header">
              <div class="restaurant-review-name">${review.name}</div>
              <div class="restaurant-review-date">${review.date}</div>
            </div>
            <div class="restaurant-review-content">
            ${review.review}
            </div>
          </div>
      `;
    });
  }
}

export default RestaurantReviewInitiator;