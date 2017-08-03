// redux
let { connect } = require('react-redux');

// user-defined app components
let { setStdGmRev, setStdGmCogs } = require('../../api/redux/actions.js');
const { STANDARD, DISCOUNT, SEGMENTED, CONTRACT, TOTAL } = require('../../api/redux/actions.js');
let GmErosionForm = require('./GmErosionForm.jsx');

const mapStateToProps = state =>
{console.log(state);
  return {
    stdRevenue: state.data[STANDARD].revenue,
    stdCogs: state.data[STANDARD].cogs,
    totalRevenue: state.data[TOTAL].revenue
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onStdGmRevUpdate: stdRevenue =>
    {
      dispatch( setStdGmRev( stdRevenue ) )
    },
    onStdGmCogsUpdate: stdCogs =>
    {
      dispatch( setStdGmCogs( stdCogs ) )
    }
  }
}

const GmErosionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GmErosionForm)

module.exports = GmErosionFormContainer;