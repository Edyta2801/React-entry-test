import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getSingleProductData } from "../utils/singleProductSlice";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class SingleProduct extends Component {
  componentDidMount() {
    let { productId } = this.props.params;
    this.props.getSingleProductData(productId);
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
    return (
      <div>
        <p>SingleProduct</p>
        <p>{brand}</p>
        <div>{description}</div>
        <div className="all-images-image">
          {gallery &&
            gallery.map((picture, index) => (
              <img key={index} src={picture} alt="" />
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  productData: state.singleProduct.productData,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProductData: (id) => dispatch(getSingleProductData(id)),
});

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
