import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAttributeValue } from "../utils/singleProductSlice";

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.setAttributeValue = this.setAttributeValue.bind(this);
  }

  render() {
    const { name, type, items } = this.props.attribute;
    let defaultValue;

    const allAttributes = Object.keys(this.props.allAttributes);
    allAttributes.map(
      (attr) => attr === name && (defaultValue = this.props.allAttributes[name])
    );
    const colorSwatch = type === "swatch";

    return (
      <Attribute>
        <h4>{name}</h4>
        <div className="attributesName">
          {items.map((item, index) => {
            const defaultItem = item.value === defaultValue;
            return !colorSwatch ? (
              <span
                key={index}
                className={`text-attribute ${defaultItem && "default"}`}
                onClick={() => this.props.setAttributeValue(name, item.value)}
              >
                {item.value}
              </span>
            ) : (
              <div
                className={` ${defaultItem && "swatch-default"}`}
                key={index}
              >
                <button
                  style={{ backgroundColor: item.value }}
                  onClick={() => {
                    this.props.setAttributeValue(name, item.value);
                  }}
                  className="swatch-attribute"
                ></button>
              </div>
            );
          })}
        </div>
      </Attribute>
    );
  }
}

const Attribute = styled.div`
  h4 {
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto Condensed", sans-serif;
    line-height: 18px;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .attributesName {
    display: flex;
    margin: 1rem 0;
  }
  .text-attribute {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--clr-black);
    min-width: 60px;
    height: 50px;
    margin-right: 0.75rem;
    &.default {
      background-color: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .swatch-default {
    border: var(--clr-green) 2px solid;
    margin-right: 0.2rem;
  }

  .swatch-attribute {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 38px;
    height: 35px;
    padding: 10px;
    margin: 0.2rem;
    border-color: transparent;

    .selected-color {
      border: red;
    }
  }
`;

// const mapStateToProps = (state) => ({
//   productData: state.singleProduct.productData,
//   allAttributes: state.singleProduct.attributes,
//   cartItems: state.cart.cartItems,
//   currencyInUse: state.products.currencyInUse,
// });

// const mapDispatchToProps = (dispatch) => ({
//   // getSingleProductData: (id) => dispatch(getSingleProductData(id)),
//   setAttributeValue: (name, value) =>
//     dispatch(setAttributeValue({ name, value })),
//   // addItem: (id, selectedAttributes) =>
//   //   dispatch(addItem({ id, selectedAttributes })),
// });

// export default (
//   connect(mapStateToProps, mapDispatchToProps)(ProductAttribute)
// );

export default ProductAttribute;
