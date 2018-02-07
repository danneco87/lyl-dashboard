import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { createProduct } from '../actions/index';
import { getToken } from '../actions/index';

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

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    style={{ width: 752 }}
    {...input}
    {...custom}
  />
);

class ProductNew extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }
  componentDidMount() {
    getToken().then(response => {
      const token = response.data.token;
      this.setState({ token });
    });
  }
  onSubmit = values => {
    this.props.createProduct(values, this.state.token, () => {
      this.props.history.push('/');
    });
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="mui-form">
        <div className="mui-textfield">
          <Field name="name" component={renderTextField} hintText="name" />
        </div>
        <div className="mui-textfield">
          <Field
            name="description"
            component={renderTextField}
            hintText="description"
          />
        </div>
        <div className="mui-textfield">
          <Field
            name="price"
            component={renderTextField}
            hintText="product price"
          />
        </div>
        <button
          type="submit"
          className="mui-btn mui-btn--raised mui-btn--primary"
          disabled={submitting}
        >
          Submit
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

ProductNew = reduxForm({
  validate,
  form: 'ProductNewForm'
})(connect(null, { createProduct, getToken })(ProductNew));

export default ProductNew;
