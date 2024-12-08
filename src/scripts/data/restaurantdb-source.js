import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
  static async allRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async searchRestaurants(query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default RestaurantDbSource;