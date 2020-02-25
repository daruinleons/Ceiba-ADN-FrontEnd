import React from 'react';
import './App.css';
import Order from './order/Order'
import OrderForm from './order/OrderForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './header/Header'

function App() {
  return (
    <div>
    <Header/>
   <BrowserRouter>
    <Route path='/' exact render={Order}/>
    <Route path='/order' component={Order}/>
    <Route path='/form-order' exact component={OrderForm}/>
    <Route path='/form-order/:id' component={OrderForm}/>
  </BrowserRouter>
</div>
);
}

export default App;
