import React from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import cartItems from "./cart-items";
import { createStore } from 'redux';
import { Provider } from "react-redux";

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0
}
//reducer
function reducer(state = initialStore, action) {

  if (action.type === 'DECREASE') {
    // state.count = state.count - 1 //we can't do this mutating
    //we have to have a copy
    return {
      ...state,
      count: state.count - 1
    }
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'INCREASE_ITEM') {
    let tempCart = state.cart.map(c => {
      if (c.id === action.payload.id) {
        c = { ...c, amount: c.amount + 1 }
      }
      return c
    })
    return { ...state, cart: tempCart }
  }


  if (action.type === 'DECREASE_ITEM') {
    let tempCart = [];
    if (action.payload.amount === 1) {
      tempCart = state.cart.filter(c => c.id !== action.payload.id)
    }
    else {
      tempCart = state.cart.map(c => {
        if(c.id === action.payload.id){
          c = { ...c, amount: c.amount - 1 }
        }
        return c
      })
    }

    return { ...state, cart: tempCart }
  }


  if (action.type === 'REMOVE_ITEM') {

    return { ...state, cart: state.cart.filter(c => c.id !== action.payload.id) }
  }
  if (action.type === 'GET_TOTALS') {
    let {total,amount} = state.cart.reduce((cartTotal,item)=>{
      cartTotal.amount += item.amount
      cartTotal.total += item.price * item.amount
      return cartTotal

    },{
      total:0,
      amount:0
    })
    total = parseFloat(total.toFixed(2))
    return { ...state,total,amount }
  }
  return state;
}

const store = createStore(reducer);
// store.dispatch({type:"DECREASE"})
console.log(store.getState())
function App() {
  // cart setup
  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
