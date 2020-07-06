import React from 'react'
import Swimmer from './Swimmer/Swimmer'
import withRouter from 'react-router-dom'
import { connect } from 'react-redux'
class SetManager extends React.Component {
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
            <div className='container'>
                <button className='btn blk'> Select Set</button>
                <table className='table table-dark table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>
                                Swimmer Name
                            </th>
                            <th>
                                Best Set Avg Time
                            </th>
                            <th>
                                Last Set Avg Time
                            </th>
                            <th>
                                Last Set Improvement
                            </th>
                            <th>
                                ADD TIME TO CURRENT SET
                            </th>
                            <th>
                                CURRENT SET COUNT
                            </th>
                            <th>
                                CURRENT SET AVERAGE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Swimmer />
                        <Swimmer />
                        <Swimmer />
                        <Swimmer />
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SetManager