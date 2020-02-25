import axios from 'axios';

const orderService = {
  getOrders: function() {
    return axios.get(`http://localhost:8080/orders`)
      .then(res => {
        return res.data;
      });
  },


  getOrderById: function(id) {
    return axios.get(`http://localhost:8080/orders/${id}`)
      .then(res => {
        return res.data;
      }).catch(function(error) {
        return error;
      });
  },

  createOrder: function(order) {
    return axios.post(`http://localhost:8080/orders`, order)
      .then(res => {
        return res.data;
      }).catch(function(error) {
        return error;
      });
  },

  updateOrder: function(order) {
    return axios.put(`http://localhost:8080/orders`, order)
      .then(res => {
        return res.data;
      }).
      catch(function(error) {
        return error;
      });
  },

  deleteOrder: function(id) {
    return axios.delete(`http://localhost:8080/orders/${id}`)
      .then(res => {});
  },

}

export default orderService;
