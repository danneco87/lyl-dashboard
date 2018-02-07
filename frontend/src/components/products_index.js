import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/index';
import { deleteProduct } from '../actions/index';
import { getToken } from '../actions/index';
class ProductsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }
  componentDidMount() {
    getToken().then(response => {
      const token = response.data.token;
      this.setState({ token });
    });
    this.getProduct();
  }
  getProduct = () => {
    this.props.fetchProducts();
  };
  onDeleteClick(id) {
    this.props.deleteProduct(id, this.state.token, () => {
      this.props.history.push('/');
    });
  }
  renderProducts = () => {
    return _.map(this.props.products, product => {
      return (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>
            <Link
              to={`/product/${product.id}`}
              className="mui-btn mui-btn--raised"
            >
              Update
            </Link>
            <button
              onClick={() => {
                this.onDeleteClick(product.id);
              }}
              className="mui-btn mui-btn--danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <h3 className="mui--text-dark-secondary mui--text-display3">
          All Products
        </h3>
        <div className="mui-panel">
          <table className="mui-table mui-table--bordered mui--text-left">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderProducts()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps, {
  fetchProducts,
  deleteProduct,
  getToken
})(ProductsIndex);
