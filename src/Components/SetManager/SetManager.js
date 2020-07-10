import React from 'react'
import Swimmer from './Swimmer/Swimmer'
import axios from 'axios'
import { connect } from 'react-redux'
class SetManager extends React.Component {
    state = {
        lane: 0,
        event: 0,
        athletes: []
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    componentDidMount() { this.get() }
    getLane = () => {
        console.log('getting lane from state')
        axios.get(`/api/athlete/athletesInLane/${this.state.lane}`).then(response => {
            this.setState({ athletes: response.data })
        })
    }
    getLaneByNum = (value) => {
        console.log('getting lane from given val')
        axios.get(`/api/athlete/athletesInLane/${value}`).then(response => {
            this.setState({ athletes: response.data })
        })
    }
    get = () => {
        this.props.dispatch({ type: 'FETCH_EVENTS' })
        if (this.state.lane === 0) {
            console.log('getting all athletes')
            axios.get(`/api/athlete/athletesActive`).then(response => {
                this.setState({ athletes: response.data })
            }).catch(error => console.log(error))
        }
        else { this.getLane() }
    }
    render() {
        return (
            <div className='container'>
                <form>
                    <div className="row my-5">
                        <div className="col-12 col-md-6">
                            <h2>Select A Test Set</h2>
                            <select className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                this.handleChange(event, 'event');
                                this.get()
                            }}>
                                <option hidden>SELECT A SET</option>
                                {console.log(this.props.event)}
                                {this.props.event.map((x) => <option value={x.id}>{x.event_name}</option>)}
                            </select>
                        </div>
                        <div className='col-12 col-md-6'>
                            <h2>Select A Lane</h2>
                            <select className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                this.handleChange(event, 'lane')
                                this.getLaneByNum(event.target.value)
                            }}>
                                <option value={0} hidden >SELECT A LANE.</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                    </div>
                </form>
                <table className='table table-dark table-striped'>
                    <thead>
                        <tr className='justify-content-center'>
                            <th scope='col' className='text-center'>
                                Swimmer Name
                            </th>

                            {(this.state.event != 0) &&
                                <th className='text-center'>
                                    Last Set Avg Time
                            </th>
                            }

                            {(this.state.event != 0) &&
                                <th className='text-center'>
                                    Last Set Improvement
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event != 0) &&
                                <th className='text-center'>
                                    ADD TIME TO CURRENT SET
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event != 0) &&
                                <th className='text-center'>
                                    CURRENT SET COUNT
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event != 0) &&
                                <th className='text-center'>
                                    CURRENT SET AVERAGE
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.athletes.map(x => <Swimmer key={x.id} name={x.athlete_name} id={x.id} set={this.state.event} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        time: state.time,
        ourObj: state.ourObj,
        user: state.user,
        swimmer: state.athlete
    }
}
export default connect(mapStateToProps)(SetManager)