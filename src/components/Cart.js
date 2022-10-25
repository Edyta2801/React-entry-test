import React, { Component } from "react";
import { connect } from "react-redux";
import ProductInCart from "./ProductInCart";
import { increase, decrease, removeItem } from "../utils/cartSlice";
import { setAttributeValue } from "../utils/singleProductSlice";
import styled from "styled-components";

export class Cart extends Component {
  render() {
    return (
      <Wrapper className="main page">
        <h3>CART</h3>
        <div className="items-container">
          <Items>
            {this.props.cart?.map((cartItem) => {
              return (
                <ProductInCart
                  key={cartItem.id}
                  {...cartItem}
                  selectedCurrency={this.props.selectedCurrerency}
                  {...this.props}
                />
              );
            })}
          </Items>
          <Summary>
            <div>
              <p>Quantity:</p>
              <p>Total:</p>
            </div>
            <div className="numbers">
              <p>2 </p>
              <p>$ 299.99</p>
            </div>
          </Summary>
          <Button>ORDER</Button>{" "}
        </div>
      </Wrapper>
    );
  }
}
const Wrapper = styled.section`
  h3 {
    font-size: 28px;
   
  }
`;
const Button = styled.button`
  width: 20%;
  border: transparent;
  outline: none;
  background: var(--clr-green);
  padding: 1rem;
  transition: background 0.3s ease;
  font-weight: 600;
  color: var(--clr-white);
  cursor: pointer;
  margin: 1.5625rem 0;

  &:disabled,
  &[disabled] {
    opacity: 0.6;
  }
`;
const Items = styled.div`
display: flex;
flex-direction: column;
`;
const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: initial;
  gap: 5px;
  align-items: center;
  border-top: 1px rgba(0, 0, 0, 0.5) solid;
  height: min-content;
  margin: 20px 0;
  p {
    font-size: 1.5rem;
  }

  .numbers {
    font-weight: 700;
  }
`;

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  selectedCurrency: state.products.selectedCurrency,
  allAttributes: state.singleProduct.attributes,
});

const mapDispatchToProps = (dispatch) => ({
  increase: (id) => dispatch(increase({ id })),
  decrease: (id) => dispatch(decrease({ id })),
  removeItem: (id) => dispatch(removeItem(id)),
  setAttributeValue: (name, value) =>
    dispatch(setAttributeValue({ name, value })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
