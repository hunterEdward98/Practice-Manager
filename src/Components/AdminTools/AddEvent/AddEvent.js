import React from 'react'
import swal from 'sweetalert'
import { connect } from 'react-redux'
class AddEvent extends React.Component {
    // only need to track the event name
    state = {
        name: '',
    }

    //when the component mounts, we want to get all events, and put them in a table
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENTS' })
    }

    //when the user clicks delete on an event, they should confirm, then it will delete
    deleteEvent = (id) => {
        swal({
            title: `Please confirm that you want to delete this event`,
            text: "Once deleted, you cannot recover the event!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your Event has been deleted!", {
                        icon: "success",
                    });
                    this.props.dispatch({ type: 'DELETE_EVENT', payload: id })
                } else {
                    swal("Event NOT deleted!");
                }
            });
    }

    //preventDefault prevents the page from refreshing, but also prevents the form elements from emptying.
    //when the user clicks the submit button with the correct data filled in, they should confirm, and it will submit
    submitNewEvent = (event) => {
        event.preventDefault()
        swal({
            title: `Confirm event name ${this.state.name}?`,
            text: "Once added, you cannot edit the event name!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your Event has been added!", {
                        icon: "success",
                    });
                    this.props.dispatch({ type: 'ADD_EVENT', payload: { name: this.state.name, } })
                    this.setState({
                        name: '',
                    })
                } else {
                    swal("Changes Not Saved!");
                }
            });
    }

    //when an input field changes, we need to track that in local state.
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }

    render() {
        return (
            <div>
                {/* form should automatically check for empty/invalid form elements, given the element is required */}
                <form className='my-4 justify-content-center row' onSubmit={(event) => this.submitNewEvent(event)}>
                    <div className='row'>
                        <small className='col-12'>Enter The Event Name</small>
                        <input required placeholder='Event Name' className='form-control blk col-9' value={this.state.name} onChange={(event) => this.handleChange(event, 'name')}></input>
                        <button type='submit col-3' className='btn btn-success'>
                            <span class="glyphicon glyphicon-ok" ></span></button>
                    </div>
                </form >
                <table className='table table-dark table-striped'>
                    <thead><tr><th scope='col' className='text-center'>Event Name</th><th scope='col' className='text-center'>Delete</th></tr></thead>
                    <tbody>
                        {this.props.event.map(x => <tr> <td>{x.name}</td><td><button onClick={() => this.deleteEvent(x.id)} className='btn btn-danger'><span className="glyphicon glyphicon-trash" ></span></button></td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
//get events from redux
const mapStateToProps = (state) => {
    return {
        event: state.event,
    }
}
//connect to redux, get props.
export default connect(mapStateToProps)(AddEvent)