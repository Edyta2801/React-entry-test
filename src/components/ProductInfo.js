import React, { Component } from "react";
import ProductAttribute from "./ProductAttribute";
import styled from "styled-components";

class ProductInfo extends Component {
  render() {
    const { attributes } = this.props.information;
    const { allAttributes } = this.props;
    
    return (
      <>
        <div className="attributes">
          {attributes?.map((attribute) => {
            return (
              <ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={allAttributes}
              />
            );
          })}
          <Price>
            <h4>Price: </h4>
            <PriceInfo>
              {this.props.defaultPrice?.currency.symbol}
              {this.props.defaultPrice?.amount.toFixed(2).toLocaleString()}
            </PriceInfo>
          </Price>
        </div>
      </>
    );
  }
}

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h4{
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto Condensed",sans-serif;
    line-height: 18px;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

const PriceInfo = styled.h4`
  font-size: 1.5rem;
  padding: 0.5rem 0;
  font-family: "Raleway", sans-serif;
`;

export default ProductInfo;
