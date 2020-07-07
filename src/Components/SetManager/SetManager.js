import React from 'react'
import Swimmer from './Swimmer/Swimmer'
import axios from 'axios'
class SetManager extends React.Component {
    state = {
        submissionCount: 0,
        submissionTotal: 0,
        minutes: 0,
        seconds: 0,
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
    get = () => {
        axios.get(`/api/time/`).then(response => {
            console.log(response.data); this.setState({ athletes: response.data })
        })
    }
    render() {
        return (
            <div className='container'>
                <form>
                    <div className="form-group btn my-5">
                        <label>Select A Test Set</label>
                        <select className="form-control btn blk" id="exampleFormControlSelect1" defaultValue='SELECT SET' label='SELECT A TEST SET'>
                            <option>500 free</option>
                            <option>dirty dozen</option>
                            <option>johnsons joyful</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
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
                        {this.state.athletes.map(x =>
                            <Swimmer name={x.athlete_name} last={x.swim_time} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SetManager