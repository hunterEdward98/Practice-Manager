import React from 'react'
import Swimmer from './Swimmer/Swimmer'
import axios from 'axios'
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
    addTime = (event) => {
        event.preventDefault();
        this.setState({
            submissionCount: this.state.submissionCount + 1,
            submissionTotal: Number(this.state.submissionTotal) + Number(Number(this.state.minutes) * 60) + Number(this.state.seconds),
            minutes: 0,
            seconds: 0,
        })
    }
    componentDidMount() { this.get() }
    getLane = () => {
        axios.get(`/api/athlete/athletesInLane/${this.state.lane}`).then(response => {
            console.log(response.data); this.setState({ athletes: response.data })
        })
    }
    getLane = (value) => {
        axios.get(`/api/athlete/athletesInLane/${value}`).then(response => {
            console.log(response.data); this.setState({ athletes: response.data })
        })
    }
    get = () => {
        axios.get(`/api/athlete/athletesActive`).then(response => {
            console.log(response.data); this.setState({ athletes: response.data })
        })
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
                                this.state.lane === 0 ? this.get() : this.getLane()
                            }}>
                                <option hidden>SELECT A SET</option>
                                <option value={1}>500 free</option>
                                <option value={2}>dirty dozen</option>
                                <option value={3}>johnsons joyful</option>
                            </select>
                        </div>
                        <div className='col-12 col-md-6'>
                            <h2>Select A Lane</h2>
                            <select className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                this.handleChange(event, 'lane')
                                this.getLane(event.target.value)
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
                        <tr>
                            <th scope='col'>
                                Swimmer Name
                            </th>
                            <th>
                                Last Set Avg Time
                            </th>
                            <th>
                                Last Set Improvement
                            </th>
                            {this.state.event != 0 &&
                                <th>
                                    ADD TIME TO CURRENT SET
                            </th>
                            }
                            {this.state.event != 0 &&
                                <th>
                                    CURRENT SET COUNT
                            </th>
                            }
                            {this.state.event != 0 &&
                                <th>
                                    CURRENT SET AVERAGE
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(this.state.event)}
                        {this.state.athletes.map(x => <Swimmer key={x.id} name={x.athlete_name} id={x.id} set={this.state.event} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SetManager