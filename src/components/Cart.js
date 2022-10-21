import React, { Component } from "react";
import { connect } from "react-redux";
import ProductInCart from "./ProductInCart";
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from "../utils/cartSlice";

export class Cart extends Component {
  render() {
    return (
      <div className="cart-items-container">
        <div className="cart-items">
          {this.props.cart?.map((cartItem) => {
            return (
              <ProductInCart
                key={cartItem.id}
                {...cartItem}
                selectedCurrency={this.props.selectedCurrerency}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  selectedCurrency: state.products.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  increase: (id) => dispatch(increase({ id })),
  decrease: (id) => dispatch(decrease({ id })),
  removeItem: (id) => dispatch(removeItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
