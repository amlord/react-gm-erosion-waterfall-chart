// react
let React = require('react');
let ReactDOM = require('react-dom');
let Redux = require('redux');
let { Provider } = require('react-redux');

// create a data store
const { createStore } = Redux;

// user-defined app components
let { setSearchText } = require('./api/redux/actions.js');
let { gmWaterfallApp } = require('./api/redux/reducers.js');
let GmErosionWaterfall = require('./components/GmErosionWaterfall.jsx');

// define Redux data store
let store = createStore( gmWaterfallApp );

// specific dealer map styles
require('./styles/index.css');

// React entry point for the dealer map
ReactDOM.render(
  <Provider store={store}>
    <GmErosionWaterfall />
  </Provider>,
  document.getElementById('gmErosionWaterfall')
);