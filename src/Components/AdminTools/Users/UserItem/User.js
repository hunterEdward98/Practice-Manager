import React from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
class User extends React.Component {
    //store whether the user is editing and the data of the displayed user
    state = {
        editMode: false,
        data: {},
        user: '',
    }
    componentDidMount() {
        this.setState({
            data: this.props.data,
            auth: this.props.data.auth_level,
            user: this.props.data.name
        })
    }
    /* 
    when the delete button is clicked, we want to ask for confirmation, if tey confirm, go ahead with the deletion.
    we need to pass in the ID so the server knows which one to delete, and the auth_level, so we can confirm to the server that
    our auth_level is higher than theirs
     */
    deleteUser = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const obj = {
                        auth: this.props.data.auth_level,
                        id: this.props.data.id,
                        org_id: this.props.data.org_id
                    }
                    this.props.dispatch({ type: 'DELETE_USER', payload: obj })
                    swal("Your user has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your user was NOT deleted!");
                }
            });
    }

    //when any of our values change in their inputs, we need to store the new values in local state
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }

    //when the user clicks save, we should send the edited user data to the server, after confirmation, much like deleteUser
    submitChanges = () => {
        swal({
            title: "Are you sure you want to save your changes?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSave) => {
                if (willSave) {
                    let obj
                    if (this.props.user.auth_level < 6) {
                        obj = {
                            old_auth: this.props.auth_level,
                            auth: this.state.auth,
                            user: this.state.user,
                            id: this.props.data.id,
                            org_id: this.props.data.org_id
                        }
                    }
                    else {
                        obj = {
                            old_auth: this.props.auth_level,
                            auth: this.state.auth,
                            user: this.state.user,
                            id: this.props.data.id,
                            org_id: this.props.data.org_id
                        }
                    }
                    this.props.dispatch({ type: 'EDIT_USER', payload: obj })
                    swal("Your user has been saved!", {
                        icon: "success",
                    });
                } else {
                    this.setState({
                        auth: this.props.data.auth_level,
                        user: this.props.data.user,
                    })
                    swal("Your user was NOT saved!");
                }
            });
    }
    render() {
        return (
            <tr>
                {this.state.editMode === false ?
                    //when editmode is false, display the username
                    <td>{this.props.data.name}</td>
                    :
                    //when editmode is true, display and input field with the value in local state. when it changes, update local state
                    <td>
                        <input value={this.state.user} className='form-control blk' onChange={(event) => this.handleChange(event, 'user')} /></td>
                }
                {this.state.editMode === false ?
                    //display text based on the component auth_level
                    <td>

                        {this.props.data.auth_level === 1 && <p>athlete</p>}
                        {this.props.data.auth_level === 2 && <p>manager</p>}
                        {this.props.data.auth_level === 3 && <p>coach</p>}
                        {this.props.data.auth_level === 4 && <p>head coach</p>}
                        {this.props.data.auth_level === 5 && <p>administrator</p>}
                        {this.props.data.auth_level === 6 && <p>Site Owner</p>}
                    </td> :
                    //display a dropdown based on USER auth level. user can never promote to their own level or higher.
                    <td>
                        <select className="form-control btn blk" id="exampleFormControlSelect1" value={this.state.auth} onChange={(event) => {
                            this.handleChange(event, 'auth')
                        }}>
                            <option value={1}>athlete</option>
                            <option value={2}>manager</option>
                            {this.props.user.auth_level >= 4 &&
                                <option value={3}>coach</option>
                            }
                            {this.props.user.auth_level >= 5 &&
                                <option value={4}>head coach</option>
                            }
                            {this.props.user.auth_level >= 6 &&
                                <option value={5}>Administrator</option>
                            }
                        </select>
                    </td>
                }
                {this.props.user.auth_level > this.state.auth ?
                    //if your auth_level is higher than the component's, you can edit the component
                    <td>
                        {this.state.editMode === false ?
                            //if editmode is false, display an edit button
                            <button className='btn btn-warning' onClick={() => this.setState({ editMode: true })}>
                                Edit
                        </button> :
                            //if editmode is true, display a save button
                            <button className='btn btn-info' onClick={() => {
                                this.submitChanges()
                                this.setState({ editMode: false })
                            }}>
                                Save
                        </button>}</td>
                    :
                    //if your auth is lower/the same as the component, editing is locked
                    <td colSpan={2}>
                        <span class="glyphicon glyphicon-lock" ></span></td>
                }
                <td>
                    {(this.props.user.auth_level > this.state.auth) &&
                        //if your auth is higher than the component's you get access to the 'delete' button
                        <button className='btn btn-danger' onClick={() => this.deleteUser()}>
                            Delete
                    </button>
                    }
                </td>
            </tr >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(User)