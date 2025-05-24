import axios from 'axios';

class Productservice {
  getProduct() {
    return axios.get('http://localhost:4000/rapor');
  }

  deleteProduct(RaporId) {
    return axios.delete(`http://localhost:4000/rapor/${RaporId}`);
  }

  getProductById(RaporId) {
    return axios.get(`http://localhost:4000/rapor/${RaporId}`);
  }

  updateProduct(RaporId, updatedData) {
    return axios.put(`http://localhost:4000/rapor/update/${RaporId}`, updatedData);
  }

  addProduct(data) {
    return axios.post('http://localhost:4000/addPatient', data, { headers: {'Content-Type' : 'application/json'} });
    
  }

  getImage(RaporId) {
    return axios.get(`http://localhost:4000/image/${RaporId}`);
  }

  searchProducts(HastaAd) {
    const params = { HastaAd };
    return axios.get('http://localhost:4000/rapor/search', { params });
  }
}

export default Productservice;
