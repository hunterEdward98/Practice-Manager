import React from 'react'
import Swimmer from './Swimmer/Swimmer'
import axios from 'axios'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import './SetManager.css'
class SetManager extends React.Component {
    //edits for submission
    state = {
        lane: 0,
        event: 0,
        athletes: []
    }
    //save edits to local state
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    componentDidMount() { this.get() }

    //get athletes in local state's 'lane'
    getLane = () => {
        axios.get(`/api/athlete/athletesInLane/${this.state.lane}`).then(response => {
            this.setState({ athletes: response.data })
        })
    }

    //get athletes in selected 'lane'
    getLaneByNum = (value) => {
        axios.get(`/api/athlete/athletesInLane/${value}`).then(response => {
            this.setState({ athletes: response.data })
        })
    }

    //get events and athletes in lane. if lane is 0(default), get all athletes
    get = () => {
        this.props.dispatch({ type: 'FETCH_EVENTS' })
        if (this.state.lane === 0) {
            axios.get(`/api/athlete/athletesActive`).then(response => {
                this.setState({ athletes: response.data })
            }).catch(error => console.log('ERROR GETTING EVENTS FROM SERVER', error))
        }
        else { this.getLane() }
    }


    render() {
        return (
            <div>
                <form>
                    <div className="row my-5">
                        <div className="col-12 col-md-6">
                            <h2>Select A Test Set</h2>
                            {/* dropdown of all events */}
                            <select className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                this.handleChange(event, 'event');
                                this.get()
                            }}>
                                <option hidden>SELECT A SET</option>
                                {this.props.event.map((x) => <option value={x.id}>{x.name}</option>)}
                            </select>
                        </div>
                        <div className='col-12 col-md-6'>
                            <h2>Select A Lane (Optional)</h2>
                            {/* dropdown of all lanes (optional) */}
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
                <table className='ui very basic collapsing celled table dark'>
                    {/* 
                    if selected set is null, 
                        only display swimmer name column. 
                    add a column for prev time and prev improvement
                    if auth_level is 2 or higher
                        add columns for adding times*/}
                    <thead>
                        <tr className=''>
                            <th scope='col' className='text-center' >Name</th>
                            {(this.state.event !== 0) &&
                                <th className='text-center'>
                                    Last Avg
                            </th>
                            }

                            {(this.state.event !== 0) &&
                                <th className='text-center'>
                                    Improvement
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event !== 0) &&
                                <th className='text-center'>
                                    Add Time
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event !== 0) &&
                                <th className='text-center'>
                                    Current Count
                            </th>
                            }
                            {(this.props.user.auth_level >= 2 && this.state.event !== 0) &&
                                <th className='text-center'>
                                    Avg
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* turn each athlete in the array into a Swimmer object, and pass in props */}
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