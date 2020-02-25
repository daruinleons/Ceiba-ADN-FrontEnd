import React from 'react';
import Header from './../header/Header'
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import clientService from './../services/client-service'
import washingMachineService from './../services/washing-machine-service'
import orderService from './../services/order-service'
import {Redirect, Link} from "react-router-dom";

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
    this.state = {...this.state, 'orderId': (typeof  props.match.params.id !== 'undefined')?props.match.params.id:null};
    console.log(this.state);
  }

  componentDidMount() {
    clientService.getClients().then(data => {
      this.setState({'clients': data});
    });

    washingMachineService.getWashingMachines().then(data => {
      this.setState({'washingMachines': data});
    });

    if(this.state.orderId !=null){
      orderService.getOrderById(this.state.orderId).then(data => {
        this.setState({
          order: {
            id: this.state.orderId,
            orderDate: data.orderDate,
            hours: data.hours,
            clientId: data.client.id,
            washingMachineId: data.washingMachine.id
          }
        }
      )
      })
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
    if(this.state.orderId === null){
      this.state.order.orderDate = this.state.order.orderDate.toISOString().split('.')[0].replace('T', ' ');
      orderService.createOrder(this.state.order).then(data => {
      this.props.history.push("/order");
      })
    }else{
      orderService.updateOrder(this.state.order).then(data => {
        this.props.history.push("/order");
      })
    }
  }

  render() {
    return (<div>
      <div className = "card-header my-5"> Formulario Orden </div> <div className = "card bg-dark text-white">
      <div className = "card-body">
      <form>
      <div className="form-group row">
      <label className = "col-form-label col-sm-2"> Cantidad Horas </label>
        <div className = "col-sm-6">
      <select className = "form-control" id = "hours" name = "hours" onChange = { this.handleChange} value = { this.state.order.hours}>
      <option> 6 </option> <option> 12 </option> <option> 24 </option> <option> 48 </option>
      </select>
      </div>
    </div>
    <div className = "for-group row">
      <label className = "col-form-label col-sm-2"> Cliente </label>
        <div className = "col-sm-6">
      <select className = "form-control" id = "clientId" name = "clientId"
      onChange = { this.handleChange } value = { this.state.order.clientId}> {
        this.state.clients.map((client) => {
          return ( <option value = {client.id}> {client.name} {client.lastName} </option>)
        })}
      </select>
    </div>
  </div> <br></br>
       <div className = "form-group row">
      <label className = "col-form-label col-sm-2"> Lavadora </label>
        <div className="col-sm-6">
      <select className = "form-control" id = "washingMachineId" name = "washingMachineId" onChange = { this.handleChange}
      value = { this.state.order.washingMachineId}> {
        this.state.washingMachines.map((washingmachine) => {
          return ( <option value = {washingmachine.id  }> {
              washingmachine.brand
            } </option>
          )
        })
      }
    </select>
    </div>
  </div>
  <div className = "form-group row">
      <label className = "col-form-label col-sm-2"> Fecha de Orden </label> <div className = "col-sm-6">
      <DateTimePicker className = "bg-light text-dark" id = "orderDate" name = "orderDate" onChange = {this.onChangeDate} value = {this.state.order.orderDate}/> </div> </div> <div className = "form-group row">
      <div className = "col-sm-6">
         <button className = "btn btn-primary mr-4" onClick = {this.saveOrder}> Guardar </button>
         <Link to="/order" className = "btn btn-primary">Cancelar</Link>
      </div>
    </div>
  </form>
</div>
</div>
</div>
        )
  }
}
export default OrderForm;
