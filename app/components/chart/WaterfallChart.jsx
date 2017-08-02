let React = require('react');
let { connect } = require('react-redux');

class WaterfallChart extends React.Component
{
    render()
    {
        return (
            <section className="panel">
                <header className="panelHeader">
                    <h1>Gross Margin Waterfall <small>(Last 12 Months)</small></h1>
                </header>
                <div className="panelBody">CHART</div>
            </section>
        );
    }
}

module.exports = WaterfallChart;