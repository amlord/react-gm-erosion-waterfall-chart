// redux
let { connect } = require('react-redux');

// user-defined app components
let WaterfallChart = require('./WaterfallChart.jsx');

const mapStateToProps = state =>
{
  return {
    waterfall: state.waterfall,
    target: state.target
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onTargetGmUpdate: targetGm =>
    {
      dispatch( setTargetGm( targetGm ) )
    }
  };
}

const WaterfallChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaterfallChart)

module.exports = WaterfallChartContainer;