let React = require('react');
let { connect } = require('react-redux');

// user-defined app components
let GmErosionFormContainer = require('./form/GmErosionFormContainer.jsx');
let CalculatedValues = require('./form/CalculatedValues.jsx');
let WaterfallChart = require('./chart/WaterfallChart.jsx');

class GmErosionWaterfall extends React.Component
{
    render()
    {
        return (
            <div className="gmErosionWaterfallContainer">
                <WaterfallChart />
                <GmErosionFormContainer />
                <CalculatedValues />
            </div>
        );
    }
}

module.exports = GmErosionWaterfall;