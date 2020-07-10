import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
class Swimmer extends React.Component {
    state = {
        submissionCount: 0,
        submissionTotal: 0,
        minutes: '',
        seconds: '',
        time: {}
    }
    getRecent = () => {
        axios.get(`/api/time/recent/${this.props.id}/${this.props.set}`).then(response => {
            this.setState({
                time: response.data[0] || {}
            })
        }).catch(error => {
            console.log(error)
        })
    }
    componentDidMount() {
        this.getRecent()
    }
    componentWillReceiveProps() {
        setTimeout(() => {
            this.getRecent()
        }, 1);
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
            submissionTotal: Math.floor((Number(this.state.submissionTotal) + (Number(this.state.minutes) * 60) + Number(this.state.seconds))),
            minutes: '',
            seconds: '',
        })
    }
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
                {(this.props.set != 0) &&
                    <td>
                        {this.state.time.swim_time ? Math.floor(this.state.time.swim_time / 60, 10) + ':' + (this.state.time.swim_time % 60 < 10 ? '0' + this.state.time.swim_time % 60 : this.state.time.swim_time % 60) : 0}
                    </td>
                }
                {(this.props.set != 0) &&
                    <td>
                        {/* Colored based on whether the swimmer's last time was an improvement */}
                        {isNaN(this.state.time.improvement) && <>N/A</>}
                        {this.state.time.improvement > 0 && <div className='btn-success'>{this.state.time.improvement}</div>}
                        {this.state.time.improvement === 0 && <div className='btn-warning'>{this.state.time.improvement}</div>}
                        {this.state.time.improvement < 0 && <div className='btn-danger'>{this.state.time.improvement}</div>}
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set != 0) &&
                    <td>
                        <form onSubmit={(event) => this.addTime(event)}>
                            <div className="form-group col-12 justify-content-center row">
                                <input required className='col-12 col-md-4' placeholder='min' type='number' value={this.state.minutes} onChange={(event) => this.handleChange(event, 'minutes')} /> :
                            <input required className='col-12 col-md-4' placeholder='sec' type='number' value={this.state.seconds} onChange={(event) => this.handleChange(event, 'seconds')} />
                                <button type='submit' className='btn btn-success col-8 col-md-5'>Add Time</button>
                            </div>
                        </form>
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set != 0) &&
                    <td>
                        {this.state.submissionCount}
                    </td>
                }
                {(this.props.user.auth_level >= 2 && this.props.set != 0) &&
                    <td>
                        {Math.floor((this.state.submissionTotal / this.state.submissionCount) / 60) || 0}:{this.state.submissionCount > 0 ? (Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60) >= 10 ? Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60) : '0' + Math.floor((this.state.submissionTotal / this.state.submissionCount) % 60)) : '0'}
                    </td>
                }
                {this.state.submissionCount > 0 && <td><button className='btn blk' onClick={this.addSet}>Submit Set</button></td>}
            </tr>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Swimmer)