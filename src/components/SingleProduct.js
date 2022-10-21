import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  getSingleProductData,
  setAttributeValue,
} from "../utils/singleProductSlice";
import ProductGalery from "./ProductGalery";
import parse from "html-react-parser";
import styled from "styled-components";
import { addItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.getDataRef = React.createRef(true);

    this.ProductAttribute = this.ProductAttribute.bind(this);
    this.ProductInfo = this.ProductInfo.bind(this);
  }

  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
    this.getDataRef = React.createRef(true);
  }
  componentWillUnmount() {
    this.getDataRef.current = true;
  }

  addItemClick() {}
  ProductAttribute(props) {
    const { name, type, items } = props.attribute;
    let defaultValue;
    const allAttributes = Object.keys(props.allAttributes);
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

  ProductInfo(props) {
    const { attributes } = props.information;
    const { allAttributes } = props;
    return (
      <>
        <div className="attributes">
          {attributes?.map((attribute) => {
            return (
              <this.ProductAttribute
                key={attribute.id}
                attribute={attribute}
                allAttributes={allAttributes}
              />
            );
          })}
          <Price>
            <h4>Price: </h4>
            <PriceInfo>
              {props.defaultPrice?.currency.symbol}
              {props.defaultPrice?.amount.toFixed(2).toLocaleString()}
            </PriceInfo>
          </Price>
        </div>
      </>
    );
  }

  render() {
    const {
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes,
      brand,
      prices,
    } = this.props.productData;

    const defaultPrice = prices?.find(
      (price) => price.currency.symbol === this.props.selectedCurrency
    );

    return (
      <Wrapper className="main page">
        <Link to="/cart">Go to cart</Link>
        <Container>
          <ProductGalery images={gallery} />
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
            {!inStock && <Stock>Out Of Stock</Stock>}

            <this.ProductInfo
              information={this.props.productData}
              allAttributes={this.props.allAttributes}
              defaultPrice={defaultPrice}
            />
            <Button
              disabled={!inStock}
              onClick={() => {
                this.props.addItem(id);
                // this.addItemClick();
              }}
              className="add-btn"
            >
              ADD TO CART
            </Button>
            <Text> {parse(`${description}`)}</Text>
          </Description>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 70rem;
  // margin: auto;
  @media (max-width: 34.375rem) {
    flex-direction: column;
    max-width: 125rem;
  }
`;

const Description = styled.div`
  flex: 2;
`;

const Brand = styled.h3`
  font-weight: 600;
  font-size: 1.875rem;
  margin-bottom: 1rem;
`;

const Name = styled.p`
  font-size: 1.875rem;
  margin-bottom: 1.25rem;
`;

const Stock = styled.p`
  color: #dc3545;
  margin-bottom: 2.6875rem;
  font-weight: 700;
`;

const Button = styled.button`
  width: 100%;
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

const Text = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
`;
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

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h4 {
    text-transform: uppercase;
    font-weight: 700;
    font-family: "Roboto Condensed", sans-serif;
    line-height: 18px;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

const PriceInfo = styled.h2`
  font-size: 1.5rem;
  padding: 0.5rem 0;
  font-family: "Raleway", sans-serif;
`;

const mapStateToProps = (state) => ({
  productData: state.singleProduct.productData,
  allAttributes: state.singleProduct.attributes,
  selectedCurrency: state.products.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
  setAttributeValue: (name, value) =>
    dispatch(setAttributeValue({ name, value })),
  addItem: (id) => dispatch(addItem({ id })),
});

export const SingleProductNew = new SingleProduct();

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
