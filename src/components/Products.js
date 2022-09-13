import React, { Component } from 'react';

export class Products extends Component {
  render() {
    return (
      <div className='showcase container'>
        <h3>Products</h3>
        <div className='flex'>
          {this.props.products?.map((product) => (
            <div key={product.id} className='product'>
              <span>{product.name}</span>
              <span>{product.brand}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Products;