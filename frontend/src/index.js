import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import ProductsIndex from './components/products_index';
import ProductNew from './components/product_new';
import ProductShow from './components/product_show';
import LoginPage from './components/auth/login_page';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/product/new" component={ProductNew} />
            <Route path="/product/:id" component={ProductShow} />
            <Route path="/protected" component={LoginPage} />
            <Route path="/" component={ProductsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('.mui-container-fluid')
);
