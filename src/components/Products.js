import React, { Component } from "react";
import styled from "styled-components";
import device from "../brakpoints";
import { white_basket } from "../assets";

export class Products extends Component {
  render() {
    return (
      <Wrapper className="main page">
        <h3 className="category-name">{this.props.currentCategory}</h3>
        <div className="product-items">
          {this.props.products?.map((product) => {
            const defaultPrice = product.prices.find(
              (price) => price.currency.symbol === this.props.selectedCurrency
            );
            console.log(defaultPrice);
            console.log(product);
            return (
              <div key={product.id} className="product">
                <div className="img-container">
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
                <div className="info-container">
                  <div className="basket">
                    <img src={white_basket} alt="basket" />
                  </div>
                  <span>{product.name}</span>
                  <p className="product-price">
                    {defaultPrice.currency.symbol}
                    {defaultPrice.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  .category-name {
    text-transform: capitalize;
    font-size: 28px;
   
  }

  .product-items {
    width: 90vw;
    margin: 4rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    justify-content: center;
    align-items: center;
    place-items: center;
    gap: ;
  }

  .product {
    display: flex;
    max-width: 400px;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      box-shadow: var(--ctrl-box-shadow-rounded);
      border-radius: 15px;
    }
  }

  .img-container {
    width: 350px;
    height: 350px;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .products-container h1 {
    padding: 2rem 0;
    text-transform: capitalize;
  }

  .info-container {
    position: relative;
    font-size: 18px;
    padding: 20px;
  }
  .info-container p {
    padding: 0.5rem 0;
  }

  .product-price {
    font-weight: 500;
  }

  .basket {
    position: absolute;
    top: 40%;
    right: 0%;
    transform: translate(-50%, -50%);
    background: var(--clr-green);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    img {
      font-size: 1.5rem;
      color: var(--clr-white);
    }
  }
  .product:hover .basket {
    opacity: 1;
  }
`;

export default Products;
