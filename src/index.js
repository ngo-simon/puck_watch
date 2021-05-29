import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import App from './App';
import store from './components/store'
import {
  BrowserRouter as Router
} from "react-router-dom"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    </Router>
  </Provider>,
  document.getElementById('root')
);

