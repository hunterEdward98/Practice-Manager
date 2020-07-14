import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
class Swimmer extends React.Component {
    //track edits here
    state = {
        submissionCount: 0,
        submissionTotal: 0,
        minutes: '',
        seconds: '',
        time: {}
    }
    //get the swimmer's most recent time from the database
    getRecent = () => {
        axios.get(`/api/time/recent/${this.props.id}/${this.props.set}`).then(response => {
            this.setState({
                time: response.data[0] || {}
            })
        }).catch(error => {
            console.log(error)
        })
    }
    //when the component mounts, run getRecent
    componentDidMount() {
        this.getRecent()
    }
    //whenever the component updates, we get the thing
    componentDidUpdate() {
        this.getRecent()
    }
    //save edits to local state
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    //add a time to the set
    addTime = (event) => {
        event.preventDefault();
        this.setState({
            submissionCount: this.state.submissionCount + 1,
            submissionTotal: Math.floor((Number(this.state.submissionTotal) + (Number(this.state.minutes) * 60) + Number(this.state.seconds))),
            minutes: '',
            seconds: '',
        })
    }
    //submit set to the DB
    addSet = () => {
        const improvement = (this.state.time.swim_time) - Math.floor(this.state.submissionTotal / this.state.submissionCount)
        console.log(improvement)
        let body = {
            improvement,
            id: this.props.id,
            time: Math.floor(this.state.submissionTotal / this.state.submissionCount),
            event: this.props.set
        }
        axios.post('/api/time', body).then(response => {
            this.setState({
                submissionCount: 0,
                submissionTotal: 0
            })
            this.getRecent()
        })
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                {(this.props.set !== 0) &&
                    <td>
                        {/* format the swim time from the server, to a visually appealing time */}
                        {this.state.time.swim_time ? Math.floor(this.state.time.swim_time / 60, 10) + ':' + (this.state.time.swim_time % 60 < 10 ? '0' + this.state.time.swim_time % 60 : this.state.time.swim_time % 60) : 0}
                    </td>
                }
                {(this.props.set !== 0) &&
                    <td>
                        {/* Colored based on whether the swimmer's last time was an improvement */}
                        {isNaN(this.state.time.improvement) && <>N/A</>}
                        {this.state.time.improvement > 0 && <div className='btn-success'>{this.state.time.improvement}</div>}
                        {this.state.time.improvement === 0 && <div className='btn-warning'>{this.state.time.improvement}</div>}
                        {this.state.time.improvement < 0 && <div className='btn-danger'>{this.state.time.improvement}</div>}
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set !== 0) &&
                    // if auth_level is 2 or higher, and we have a set selected, allow the user to add a time
                    <td>
                        <form onSubmit={(event) => this.addTime(event)}>
                            <div className='justify-content-center row'>
                                <input required className='form-control col-6 col-sm-4' placeholder='min' type='number' value={this.state.minutes} onChange={(event) => this.handleChange(event, 'minutes')} /><div className='col-12 col-sm-1 text-center'>:</div>
                                <input required className='form-control col-6 col-sm-4' placeholder='sec' type='number' value={this.state.seconds} onChange={(event) => this.handleChange(event, 'seconds')} />
                            </div>
                            <button type='submit' className='btn btn-success'>Add Time</button>
                        </form>
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set !== 0) &&

                    // if auth_level is 2 or higher, and we have a set selected, allow the user track their times added
                    <td>
                        {this.state.submissionCount}
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set !== 0) &&
                    // if auth_level is 2 or higher, and we have a set selected, allow the user to track their average time added
                    <td>
                        {Math.floor((this.state.submissionTotal / this.state.submissionCount) / 60) || 0}:{this.state.submissionCount > 0 ? (Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60) >= 10 ? Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60) : '0' + Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60)) : '0'}
                    </td>
                }
                {this.state.submissionCount > 0 &&
                    //if the submission count is above 0, display a 'submit set' button
                    <td>
                        <button className='btn blk' onClick={this.addSet}>Submit Set</button>
                    </td>}
            </tr>
        )
    }
}
//get the user from redux
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
// connect to redux, get props
export default connect(mapStateToProps)(Swimmer)