import React from 'react';
import './App.css';
import Order from './order/Order'
import OrderForm from './order/OrderForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (<BrowserRouter>
    <Route path='/' exact render={Order}/>
    <Route path='/order' component={Order}/>
    <Route path='/new-order' exact component={OrderForm}/>
    <Route path='/form-order/:id' component={OrderForm}/>
  </BrowserRouter>);
}

export default App;
