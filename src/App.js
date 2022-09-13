import React, { Component } from "react";
import { connect } from 'react-redux';
import { getData, getCategory } from './utils/productsSlice';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, CartOverlay, Footer, Products } from "./components";
import { Cart, SingleProduct, Error } from "./Pages";



export class App extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }
  render() {
    return (
      <Router>
        <Navbar {...this.props} />
        {/* <CartOverlay /> */}
        <Routes>
          <Route path="/" element={<Products  {...this.props}/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
  products: state.products.productsList,
  currencies: state.products.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getData()),
  getCategory: (category) => dispatch(getCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
