import React from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
class Time extends React.Component {
    state = {
        editMode: false,
        event: '',
        eventId: 0,
        swimTime: 0,
        date: ''
    }
    //when component mounts: set local state to props, and fetch all events
    componentDidMount() {
        this.setState({
            event: this.props.name,
            eventId: this.props.eventId,
            swimTime: this.props.swimTime,
            date: this.props.date
        })

        this.props.dispatch({ type: 'FETCH_EVENTS' })
    }

    //delete a time from the swimmer's history after confirming
    deleteTime = () => {
        swal({
            title: "Are you sure you want to delete this time?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSave) => {
                if (willSave) {
                    this.props.dispatch({ type: 'DELETE_TIME', payload: { id: this.props.id, athId: this.props.athId } })
                    swal("Your time has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your time was NOT deleted!");
                }
            });
    }
    //save changes to local state
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    //send changes to server, after confirmation
    saveEdits() {
        swal({
            title: "Are you sure you want to edit this time?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSave) => {
                if (willSave) {
                    const improvementChange = this.props.swimTime - this.state.swimTime
                    const obj = {
                        improvementChange,
                        event: this.state.eventId,
                        time: this.state.swimTime,
                        id: this.props.id,
                        athId: this.props.athId
                    }
                    this.props.dispatch({ type: 'EDIT_TIME', payload: obj })
                    swal("Your time has been edited!", {
                        icon: "success",
                    });
                } else {
                    swal("Your time was NOT edited!");
                }
            });
    }

    render() {
        return (
            <tr>
                <td>
                    {this.state.editMode === false ?
                        //if in edit mode, print the event name
                        String(this.props.name) || '' :
                        //if not in edit mode, display a dropdown of all event names
                        <select value={this.state.eventId} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                            this.handleChange(event, 'eventId');
                        }}>
                            <option hidden>SELECT A SET</option>
                            {this.props.event.map((x) => <option value={x.id}>{x.name}</option>)}
                        </select>
                    }
                </td>
                <td>
                    {this.state.editMode === false ?
                        //if not in edit mode, display the swim's time
                        String(this.props.swimTime) || '' :
                        //if in edit mode, display an input field for a number
                        <input value={this.state.swimTime} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                            this.handleChange(event, 'swimTime');
                        }}>
                        </input>
                    }
                </td>
                <td>
                    {String(this.props.date) || ''}
                </td>
                {
                    this.props.user.auth_level >= 3 &&
                    //if the user has an auth_level of 3 or above, display this column. otherwise, no
                    <th>{this.state.editMode === false ?
                        //if not in edit mode, display an edit button
                        <button className='btn btn-warning' onClick={() => this.setState({ editMode: true })} > Edit</button> :
                        //if in edit mode, display a save button
                        <button className='btn btn-info' onClick={() => { this.saveEdits(); this.handleChange({ target: { value: false } }, 'editMode') }} > Save</button>}</th>}

                {
                    this.props.user.auth_level >= 3 &&
                    //if the user has an auth_level of 3 or above, display this column. otherwise, no
                    <th><button className='btn btn-danger' onClick={() => this.deleteTime()}>Delete</button></th>
                }
            </tr >
        )

    }
}

//get events, times, user, and swimmer from redux
const mapStateToProps = (state) => {
    return {
        event: state.event,
        time: state.time,
        user: state.user,
        swimmer: state.athlete
    }
}
//connect to redux, get props
export default connect(mapStateToProps)(Time)