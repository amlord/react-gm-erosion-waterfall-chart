let React = require('react');
let { connect } = require('react-redux');

class GmErosionForm extends React.Component
{
    render()
    {
        return (
            <div className="panel">
                <header className="panelHeader panelHeader--info">
                    <h1>Revenue &amp; Cost of Goods</h1>
                </header>
                <div className="panelBody">
                    <form>
                        <table className="table table--full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Standard</th>
                                    <th>Discount</th>
                                    <th>Segmented</th>
                                    <th>Contract</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Revenue</td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input disabled /></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><abbr title="Cost of Goods">COGs</abbr></td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input /></div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer"><input disabled /></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = GmErosionForm;