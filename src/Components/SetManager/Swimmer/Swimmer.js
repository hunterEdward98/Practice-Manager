import React from 'react'
import withRouter from 'react-router-dom'
import { connect } from 'react-redux'
class Swimmer extends React.Component {
    state = {
        submissionCount: 0,
        submissionTotal: 0,
        minutes: 0,
        seconds: 0,
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    addTime = (event) => {
        event.preventDefault();
        this.setState({
            submissionCount: this.state.submissionCount + 1,
            submissionTotal: Number(this.state.submissionTotal) + Number(Number(this.state.minutes) * 60) + Number(this.state.seconds),
            minutes: 0,
            seconds: 0,
        })
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {Math.floor(this.props.last / 60, 10) + ':' + (this.props.last % 60 < 10 ? '0' + this.props.last % 60 : this.props.last % 60)}
                </td>
                <td>
                    {this.props.improvement}
                </td>
                <td>

                    <form onSubmit={(event) => this.addTime(event)}>
                        <div className="form-group">
                            <input required className='col-12 col-md-4' placeholder='min' type='number' value={this.state.minutes} onChange={(event) => this.handleChange(event, 'minutes')} /> :
                            <input required className='col-12 col-md-6 my-1' placeholder='sec' type='number' value={this.state.seconds} onChange={(event) => this.handleChange(event, 'seconds')} />
                            <button type='submit' className='btn btn-success'>Add Time</button>
                        </div>
                    </form>
                </td>
                <td>
                    {this.state.submissionCount}
                </td>
                <td>
                    {this.state.submissionTotal}
                </td>
                {this.state.submissionCount > 0 && <td><button>Submit Set</button></td>}
            </tr>
        )
    }
}
export default Swimmer