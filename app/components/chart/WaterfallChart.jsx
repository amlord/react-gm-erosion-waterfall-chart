let React = require('react');
let { connect } = require('react-redux');

class WaterfallChart extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            waterfall: props.waterfall
        };

        this.drawWaterfallChart = this.drawWaterfallChart.bind(this);
    }

    componentWillReceiveProps( nextProps )
    {
        let { waterfall } = this.state;

        if( nextProps.waterfall !== waterfall )
        {
            this.setState({
                waterfall: nextProps.waterfall
            });
        }
    }

    componentDidMount()
    {
        this.drawWaterfallChart();
    }

    componentDidUpdate()
    {
        this.drawWaterfallChart();
    }

    drawWaterfallChart()
    {
        let data = this.state.waterfall;
        const goldenRatio = 1.61803398875;

        // get min & max data values
        let dMax = d3.max(data, d => {
            return d.gmPercent;
        });

        // calculate height & width (using golden ratio)
        let width = document.querySelector('.waterfallChart').offsetWidth;
        let height = width / goldenRatio;

        d3.select(".waterfallChart svg").remove();

        let svg = d3.select(".waterfallChart").append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        let chartData = data.map(row => row.value);

        let y = d3.scaleLinear()
            .domain([0, dMax])
            .range([0, height]);

        let x = d3.scaleLinear()
            .domain([0, chartData.length])
            .range([0, width]);

        let yPos = [0];

        svg.selectAll(".bar")
            .data(chartData)
            .enter()
                .append("rect")
                .attr("class", "waterfallChart__bar")
                .attr("x", (d, i) =>
                {
                    return x(i);
                })
                .attr("y", (d, i) =>
                {
                    yPos.push( (yPos.length === 1) ?
                                0 :
                                yPos[i] + ( parseFloat(d) * -1 ) );

                    return y(yPos[i]);
                })
                .attr("width", x(0.7))
                .attr("height", (d, i) =>
                {
                    return  y(Math.abs(d));
                });
    }

    render()
    {
        return (
            <section className="panel">
                <header className="panelHeader">
                    <h1>Gross Margin Waterfall <small>(Last 12 Months)</small></h1>
                </header>
                <div className="panelBody">
                    <div className="waterfallChart"></div>
                </div>
            </section>
        );
    }
}

module.exports = WaterfallChart;