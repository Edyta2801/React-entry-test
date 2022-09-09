import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, CartOverlay, Footer } from "./components";
import { Products, Cart, SingleProduct, Error } from "./Pages";

export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <CartOverlay />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
