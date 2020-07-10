import React from 'react'
import swal from 'sweetalert'
import { connect } from 'react-redux'
class User extends React.Component {
    state = {
        user: '',
        name: '',
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENTS' })
    }
    deleteEvent = (id) => {
        this.props.dispatch({ type: 'DELETE_EVENT', payload: id })
    }
    submitNewSwimmer = (event) => {
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
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    render() {
        return (
            <div className='container'>
                <form className='my-4 justify-content-center row' onSubmit={(event) => this.submitNewSwimmer(event)}>
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
                        {this.props.event.map(x => <tr> <td>{x.event_name}</td><td><button onClick={() => this.deleteEvent(x.id)} className='btn btn-danger'><span className="glyphicon glyphicon-trash" ></span></button></td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        event: state.event,
    }
}
export default connect(mapStateToProps)(User)