import React from 'react';
import Header from './../header/Header'
import orderService from './../services/order-service'
import NumberFormat from 'react-number-format'
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import {Link} from "react-router-dom";


class Order extends React.Component {

  state = {
    orders: []
  }
  componentDidMount() {
    orderService.getOrders().then(data => {
      this.setState({
        'orders': data
      });
    });
  }

  deleteOrder = (id) => {
    orderService.deleteOrder(id).then(data => {
      window.location.reload(false);
    });
  }

  render() {
    return (<div>
      <Header/>
      <div class='container'>
        <div class="card border-primary mb-3 my-3">
          <div class="card-header">
            Ordenes
          </div>
          <div class="card-body text-primary">
            <h5 class="card-title">Listado de ordenes</h5>
            <div class="my-2 text-left">
              <a class="btn btn-rounded btn-success" type="button" href='/new-order'>Crear Orden</a>
            </div>
            <table class='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cliente</th>
                  <th>Lavadora</th>
                  <th>Fecha de Orden</th>
                  <th>Fecha de Entrega</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.orders.map((order) => {
                    return (<tr>
                      <td>{order.id}</td>
                      <td>{order.client.name + ' ' + order.client.lastName}</td>
                      <td>{order.washingMachine.brand}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.deliveryDate}</td>
                      <td><NumberFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                      <td>
                        <Link to= {"/form-order/" + order.id }  className = "btn btn-success"><FaEdit /></Link> &nbsp;
                        <a class="btn btn-danger" onClick={() => this.deleteOrder(order.id)} ><FaWindowClose/> </a>
                      </td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>)
  }
}
export default Order;
