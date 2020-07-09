import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Time extends React.Component {
    state = {
        editMode: false,
        event: '',
        eventId: 0,
        swimTime: 0,
        date: ''
    }
    componentDidMount() {
        console.log('props:', this.props)
        this.setState({
            event: this.props.eventName,
            eventId: this.props.eventId,
            swimTime: this.props.swimTime,
            date: this.props.date
        })
        this.props.dispatch({ type: 'FETCH_EVENTS' })
    }
    componentWillReceiveProps() {
        const timer = setTimeout(() => {
            this.setState({
                event: this.props.eventName,
                eventId: this.props.eventId,
                swimTime: this.props.swimTime,
                date: this.props.date
            })
        }, 1);
    }
    deleteTime = () => {
        this.props.dispatch({ type: 'DELETE_TIME', payload: { id: this.props.id, athId: this.props.athId } })
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    saveEdits() {
        const improvementChange = this.props.swimTime - this.state.swimTime
        const obj = {
            improvementChange,
            event: this.state.eventId,
            time: this.state.swimTime,
            id: this.props.id,
            athId: this.props.athId
        }
        console.log('sending:', obj)
        this.props.dispatch({ type: 'EDIT_TIME', payload: obj })
    }
    render() {
        return (
            <tr>
                <td>
                    {this.state.editMode === false ?
                        String(this.state.event) :
                        <select value={this.state.eventId} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                            this.handleChange(event, 'eventId');
                            console.log(event)
                        }}>
                            <option hidden>SELECT A SET</option>
                            {console.log(this.props.event)}
                            {this.props.event.map((x) => <option value={x.id}>{x.event_name}</option>)}
                        </select>
                    }
                </td>
                <td>
                    {this.state.editMode === false ?
                        String(this.state.swimTime) :
                        <input value={this.state.swimTime} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                            this.handleChange(event, 'swimTime');
                        }}>
                        </input>
                    }
                </td>
                <td>
                    {String(this.state.date)}
                </td>
                {
                    this.props.user.auth_level >= 3 && <th>{this.state.editMode === false ?
                        <button className='btn btn-warning' onClick={() => this.setState({ editMode: true })} > Edit</button> :
                        <button className='btn btn-info' onClick={() => { this.saveEdits(); this.handleChange({ target: { value: false } }, 'editMode') }} > Save</button>}</th>}

                {
                    this.props.user.auth_level >= 3 && <th><button className='btn btn-danger' onClick={() => this.deleteTime()}>Delete</button></th>
                }
            </tr>
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
export default connect(mapStateToProps)(Time)