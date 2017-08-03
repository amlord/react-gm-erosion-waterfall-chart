let React = require('react');
let { connect } = require('react-redux');

class CalculatedValues extends React.Component
{
    render()
    {
        return (
            <div className="panel">
                <header className="panelHeader panelHeader--info">
                    <h1>Calculated Gross Margin %</h1>
                </header>
                <div className="panelBody">
                    <table className="table table--full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Standard</th>
                                    <th>Discount</th>
                                    <th>Segmented</th>
                                    <th>Contract</th>
                                    <th>Actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><abbr title="Gross Margin">GM</abbr>%</td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Difference</td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input readOnly /></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        );
    }
}

module.exports = CalculatedValues;