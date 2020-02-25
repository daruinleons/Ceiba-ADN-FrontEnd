import React from 'react';
import Header from './../header/Header'
import orderService from './../services/order-service'
import NumberFormat from 'react-number-format'
import {FaEdit, FaWindowClose} from 'react-icons/fa';
import {Link} from "react-router-dom";
import swal from 'sweetalert';

class Order extends React.Component {

  state = {
    orders: []
  }
  componentDidMount() {
    orderService.getOrders().then(data => {
      this.setState({'orders': data});
    });
  }

  deleteOrder = (id) => {
    swal({title: "¿Está seguro?", text: "Una vez eliminada, Usted no podrá recuperar la orden!", icon: "warning", buttons: true, dangerMode: true}).then((willDelete) => {
      if (willDelete) {
        orderService.deleteOrder(id).then(data => {
          window.location.reload(false);
        });
      }
    });
  }

  render() {
    return (<div>
      <div className='container'>
        <div className="card border-primary mb-3 my-3">
          <div className="card-header">
            Ordenes
          </div>
          <div className="card-body text-primary">
            <h5 className="card-title">Listado de ordenes</h5>
            <div className="my-2 text-left">
              <a className="btn btn-rounded btn-success" type="button" href='/form-order'>Crear Orden</a>
            </div>
            <div class="table-responsive">
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Cliente</th>
                    <th>Lavadora</th>
                    <th>Capacidad</th>
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
                        <td>{order.washingMachine.capacity + ' libras'}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.deliveryDate}</td>
                        <td><NumberFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'}/></td>
                        <td>
                          <Link to={"/form-order/" + order.id} className="btn btn-success mt-1"><FaEdit/></Link>
                          &nbsp;
                          <a className="btn btn-danger mt-1" onClick={() => this.deleteOrder(order.id)}><FaWindowClose/>
                          </a>
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
export default Order;
