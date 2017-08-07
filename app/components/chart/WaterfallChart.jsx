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
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions()
    {
        this.drawWaterfallChart();
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

        // add an event to redraw the chart on resize
        window.addEventListener("resize", this.updateDimensions);
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
            console.log(d.gmPercent);
            return d.gmPercent;
        });

        // calculate height & width (using golden ratio)
        let width = document.querySelector('.waterfallChart').offsetWidth;
        let height = width / goldenRatio;
        let margin = {
            top: 5,
            bottom: 20,
            left: 30,
            right: 10
        };
        let innerWidth = width - margin.left - margin.right;
        let innerHeight = height - margin.top - margin.bottom;

        d3.select(".waterfallChart svg").remove();

        let svg = d3.select(".waterfallChart").append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        let chart = svg.append("g")
                        .classed("waterfallChart__bars", true)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        let xAxisGroup = svg.append("g")
                        .classed("waterfallChart__axis waterfallChart__axis--x", true)
                        .attr("transform", "translate(" + margin.left + "," + ( height - margin.bottom ) + ")");
        
        let yAxisGroup = svg.append("g")
                        .classed("waterfallChart__axis waterfallChart__axis--y", true)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let y = d3.scaleLinear()
            .domain([0, dMax])
            .range([innerHeight, 0]);

        let x = d3.scaleBand()
            .domain(data.map(d =>
            {
                return d.name;
            }))
            .range([0, innerWidth]);

        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y);

        let yPos = [0];

        // add bars to the chart
        chart.selectAll(".waterfallChart__bar")
            .data(data)
            .enter()
                .append("rect")
                .classed("waterfallChart__bar", true)
                .attr("x", (d, i) =>
                {
                    return x(d.name) + ( x.bandwidth() * 0.125 );
                })
                .attr("y", (d, i) =>
                {
                    yPos.push( (yPos.length === 1) ?
                                0 :
                                yPos[i] + ( parseFloat(d.value) * -1 ) );

                    return innerHeight - y(yPos[i]);
                })
                .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ) )
                .attr("height", (d, i) =>
                {
                    return  innerHeight - y(Math.abs(d.value));
                });
        
        // add the axes
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
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