import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './ducks/configureStore';
import App from './App';

const store = configureStore();
const rootElement = document.getElementById('root');
const renderApp = (AppComponent) => {
  ReactDOM.render(
    <AppContainer>
      <AppComponent store={store} />
    </AppContainer>,
    rootElement
  );
};

// store.subscribe((...args) => {
//   console.log(...args, store.getState());
// });
// window.store = store;

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    renderApp(require('./App').default);
  });
}
