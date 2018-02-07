import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { fetchProduct, getToken, updateProduct } from '../actions/index';

const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'description', 'price'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

class ProductShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      description: '',
      price: ''
    };
  }
  componentDidMount() {
    getToken().then(response => {
      const token = response.data.token;
      this.setState({ token });
    });
    const { id } = this.props.match.params;
    if (!this.props.product) {
      this.props.fetchProduct(id);
      this.props.fetchProduct(id).then(response => {
        this.setState({ name: response.payload.data.name });
        this.setState({ description: response.payload.data.description });
        this.setState({ price: response.payload.data.price });
      });
    } else {
      this.props.fetchProduct(id).then(response => {
        this.setState({ name: response.payload.data.name });
        this.setState({ description: response.payload.data.description });
        this.setState({ price: response.payload.data.price });
      });
    }
  }
  onSubmit = e => {
    const { id } = this.props.match.params;
    const { name, description, price } = this.state;
    this.props.updateProduct(
      id,
      this.state.token,
      name,
      description,
      price,
      () => {
        this.props.history.push('/');
      }
    );
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="mui-form">
        <div className="mui-textfield">
          <TextField
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className="mui-textfield">
          <TextField
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className="mui-textfield">
          <TextField
            name="price"
            value={this.state.price}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className="mui-btn mui-btn--raised mui-btn--primary"
          disabled={submitting}
        >
          Update
        </button>
        <button
          type="button"
          className="mui-btn mui-btn--raised mui-btn--accent"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear
        </button>
        <Link to="/" className="mui-btn mui-btn--danger">
          Cancel
        </Link>
      </form>
    );
  }
}

ProductShow = reduxForm({
  validate,
  form: 'ProductShowForm'
})(connect(null, { fetchProduct, updateProduct })(ProductShow));

export default ProductShow;
