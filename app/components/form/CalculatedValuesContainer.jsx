// redux
let { connect } = require('react-redux');

// user-defined app components
const { STANDARD, DISCOUNT, SEGMENTED, CONTRACT, PROMOTIONAL, TOTAL } = require('../../api/redux/actions.js');
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