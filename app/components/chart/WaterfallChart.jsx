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
            return d.gmPercent;
        });

        // calculate height & width (using golden ratio)
        let width = document.querySelector('.waterfallChart').offsetWidth;
        let height = width / goldenRatio;
        let margin = {
            top: 0,
            bottom: 20,
            left: 10,
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
        
        let labels = svg.append("g")
                        .classed("waterfallChart__labels", true)
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let y = d3.scaleLinear()
            .domain([0, dMax])
            .range([0, innerHeight]);

        let x = d3.scaleBand()
            .domain(data.map(d =>
            {
                return d.name;
            }))
            .range([0, innerWidth]);

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

                    return y(yPos[i]);
                })
                .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ) )
                .attr("height", (d, i) =>
                {
                    return  y(Math.abs(d.value));
                });
    
        // add labels to the chart
        labels.selectAll(".waterfallChart__barLabel")
            .data(data)
            .enter()
                .append("text")
                .classed("waterfallChart__barLabel", true)
                .attr("x", (d, i) =>
                {
                    return x(d.name) + ( x.bandwidth() * 0.125 );
                })
                .attr("y", height)
                .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ))
                .attr("text-anchor", "middle")
                .text((d,i) =>
                {
                    return d.name + " (" + d.value + ")";
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