import API_ENDPOINT from '../globals/api-endpoint';

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

  async _onSubmit() {
    const name = this._form.elements['name'].value;
    const review = this._form.elements['review'].value;
    const id = this._restaurantId.id;

    if (!name || !review) {
      alert('Review tidak boleh kosong!');
      return 0;
    }

    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, review }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.statusText}`);
      }

      const data = await response.json();

      this._form.reset();

      this._renderReview(data.customerReviews);
    } catch (error) {
      console.error('Error while submitting review:', error);
      alert('Gagal menambahkan review! Silakan coba lagi nanti.');
    }
  },

  _renderReview(reviews) {
    this._reviewContainer.innerHTML = '';
    reviews.forEach((review) => {
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
  },
};

export default RestaurantReviewInitiator;
