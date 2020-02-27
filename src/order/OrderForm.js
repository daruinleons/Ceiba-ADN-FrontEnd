import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import clientService from './../services/client-service'
import washingMachineService from './../services/washing-machine-service'
import orderService from './../services/order-service'
import {Link} from "react-router-dom";
import swal from 'sweetalert';
import { Helmet } from 'react-helmet'

class OrderForm extends React.Component {

  state = {
    order: {
      orderDate: new Date(),
      hours: 6,
      clientId: 1,
      washingMachineId: 1
    },
    clients: [],
    washingMachines: []
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      'orderId': (typeof props.match.params.id !== 'undefined')
        ? props.match.params.id
        : null
    };
  }

  componentDidMount() {
    clientService.getClients().then(data => {
      this.setState({'clients': data});
    });

    washingMachineService.getWashingMachines().then(data => {
      this.setState({'washingMachines': data});
    });

    if (this.state.orderId != null) {
      orderService.getOrderById(this.state.orderId).then(data => {
        this.setState({
          order: {
            id: this.state.orderId,
            orderDate: new Date(data.orderDate),
            hours: data.hours,
            clientId: data.client.id,
            washingMachineId: data.washingMachine.id
          }
        })
      }).catch(function(error) {
        window.location.replace("/order");
      });
    }
  }

  onChangeDate = orderDate => this.setState({
    order: {
      ...this.state.order,
      orderDate
    }
  })

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      order: {
        ...this.state.order,
        [name]: value
      }
    })
  }

  saveOrder = (e) => {
    e.preventDefault();
    this.state.order.orderDate = this.state.order.orderDate.toISOString().split('.')[0].replace('T', ' ');
    if (this.state.orderId === null) {
      orderService.createOrder(this.state.order).then(data => {
        this.validateResponse(data);
      })
    } else {
      orderService.updateOrder(this.state.order).then(data => {
        this.validateResponse(data);
      })
    }
  }

  validateResponse = (data) => {
    if (typeof data.response !== 'undefined' && data.response.status === 500) {
      swal("Error", "Descripcion: " + data.response.data.message, "error");
    } else {
      swal("Guardado", "La orden se guardó correctamente", "success");
    }
      this.props.history.push("/order")
  }

  render() {
    return (
      <div>
        <Helmet>
           <title>Formulario orden</title>
         </Helmet>
      <div className="container">
      <div className="card-header my-5">
        Formulario Orden
      </div>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form>
            <div className="form-group row">
              <label className="col-form-label col-sm-5 col-md-2">
                Cantidad Horas
              </label>
              <div className="col-sm-7 col-md-6">
                <select className="form-control" id="hours" name="hours" onChange={this.handleChange} value={this.state.order.hours}>
                  <option>6</option>
                  <option>12</option>
                  <option>24</option>
                  <option>48</option>
                </select>
              </div>
            </div>
            <div className="for-group row">
              <label className="col-form-label col-sm-5 col-md-2">
                Cliente
              </label>
              <div className="col-sm-7 col-md-6">
                <select className="form-control" id="clientId" name="clientId" onChange={this.handleChange} value={this.state.order.clientId}>
                  {
                    this.state.clients.map((client) => {
                      return (<option value={client.id}>
                        {client.name + ' ' + client.lastName}
                      </option>)
                    })
                  }
                </select>
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="col-form-label col-sm-5 col-md-2">
                Lavadora
              </label>
              <div className="col-sm-7 col-md-6">
                <select className="form-control" id="washingMachineId" name="washingMachineId" onChange={this.handleChange} value={this.state.order.washingMachineId}>
                  {
                    this.state.washingMachines.map((washingmachine) => {
                      return (<option value={washingmachine.id}>
                        {washingmachine.brand + ' - ' + washingmachine.capacity +  ' libras'}
                      </option>)
                    })
                  }
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-form-label col-sm-5 col-md-2">
                Fecha de Orden
              </label>
              <div className="col-sm-7 col-sm-6">
                <DateTimePicker className="bg-light text-dark" id="orderDate" name="orderDate" onChange={this.onChangeDate} value={this.state.order.orderDate}
                  disabledDays={{
                    before: new Date()
                  }}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <button className="btn btn-primary mr-4" onClick={this.saveOrder} id="saveButton">
                  Guardar
                </button>
                <Link to="/order" className="btn btn-primary">Cancelar</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
  }
}
export default OrderForm;
