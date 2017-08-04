// redux
let { connect } = require('react-redux');

// user-defined app components
let CalculatedValues = require('./CalculatedValues.jsx');

const mapStateToProps = state =>
{
  return {
    waterfall: state.waterfall
  }
}

const mapDispatchToProps = dispatch =>
{
  return {};
}

const CalculatedValuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedValues)

module.exports = CalculatedValuesContainer;