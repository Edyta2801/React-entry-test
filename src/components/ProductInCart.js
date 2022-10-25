import React, { Component } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { SingleProductNew } from "./SingleProduct";
import styled from "styled-components";

export class ProductInCart extends Component {
  render() {
    const { id, brand, name, prices, attributes, amount, gallery } = this.props;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.selectedCurrency
    );
    return (
      <Wrapper>
        <div className="cart-info">
          <h2>{brand}</h2>
          <h2 className="name">{name}</h2>
          <div className="price">
            <h5 className="price-info">
              {defaultPrice?.currency.symbol}
              {defaultPrice?.amount.toLocaleString()}
            </h5>
          </div>
          {console.log(this.props)}
          {attributes?.map((attribute) => {
            return (
              <SingleProductNew.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={attributes}
              />
            );
          })}
        </div>
        <div className="cart-showcase">
          <div className="cart-item-amount">
            <span onClick={() => this.props.increase(id)}>
              <FaPlus />
            </span>
            <span className="amount"> {amount} </span>
            <span
              onClick={() => {
                if (amount < 1) {
                  this.props.removeItem(id);
                } else {
                  this.props.decrease(id);
                }
              }}
            >
              <FaMinus />
            </span>
          </div>
          <div className="cart-item-img">
            <img src={gallery && gallery[0]} alt="" />
          </div>
        </div>
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px rgba(0, 0, 0, 0.5) solid;
  padding: 1.5rem 0;
  min-height: 280px;

  h2.name {
    font-weight: 400;
  }
  .price {
    font-size: 1.8rem;
  }

  .cart-showcase {
    display: flex;
    justify-content: center;
    align-items: center;

    .cart-item-amount {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      width: 40px;
      margin-right: 2rem;
      text-align: center;

      & > span {
        width: 100%;
        padding: 0.5rem 0;
        border: 2px solid black;
        cursor: pointer;
        // font-size: 1.8rem;
        font-weight: 400;
      }
      span.amount {
        border: transparent;
        font-size: 1.5rem;
      }
    }

    .attribute {
      margin-top: 50px;
    }

    .cart-item-img {
      width: 150px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      }
    }
  }
`;

export default ProductInCart;
