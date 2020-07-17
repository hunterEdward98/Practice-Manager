import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Axios from 'axios'
import swal from 'sweetalert'
class SwimmerInfo extends React.Component {
    //save edits in local state temporarily
    state = {
        editMode: false,
        active: true,
        year: 0,
        lane: 0,
        id: 0
    }
    //clear times when the component unmounts
    componentWillUnmount() {
        this.props.dispatch({ type: 'FETCH_TIMES', payload: 0 })
    }
    //confirm, then send a 'delete' to the server, refresh the page
    deleteSwimmer = () => {
        swal({
            title: "Are you sure you want to delete this swimmer?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSave) => {
                if (willSave) {
                    console.log(this.props.id)
                    //FIX LATER. MOVE TO SAGA. ELIMINATE PAGE REFRESH
                    Axios.delete(`/api/athlete/${this.props.data.id}/${this.props.data.org_id}`)
                    this.props.delFunction()
                    swal("Your swimmer has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your swimmer was NOT deleted!");
                }
            });
    }
    //save changes to inputs in local state
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    //push edits to server after confirmation
    saveEdits() {
        swal({
            title: "Are you sure you want to edit this swimmer?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSave) => {
                if (willSave) {
                    const obj = {
                        active: this.state.active,
                        year: this.state.year,
                        lane: this.state.lane,
                        id: this.props.data.id
                    }
                    this.props.dispatch({ type: 'EDIT_ATHLETE', payload: obj })
                    swal("Your edits were sent to the server!", {
                        icon: "success",
                    });
                } else {
                    swal("Your swimmer was NOT edited!");
                }
            });
    }
    componentDidUpdate() { }
    render() {
        return (
            <tbody>
                {(this.props.data !== '') &&
                    <tr>
                        <td>
                            {this.state.editMode === false ?
                                //if not in editMode, display the swimmers 'active' status
                                String(this.props.data.active) :
                                //if in edit mode, give a dropdown with 'true' or 'false' as the options
                                <select value={this.state.active} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'active');
                                }}>
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select>
                            }
                        </td>
                        <td>

                            {this.state.editMode === false ?
                                //if edit mode is false, display the year of the swimmer
                                String(this.props.data.year) :
                                //if in edit mode, give a dropdown of years for the swimmer
                                <select value={this.state.year} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'year');
                                }}>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </select>
                            }
                        </td>
                        <td>
                            {this.state.editMode === false ?
                                //if not in edit mode, display the lane of the swimmer
                                String(this.props.data.lane_number) :
                                //if in edit mode, display a dropdown of lanes 1 through 8
                                <select value={this.state.lane} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'lane');
                                }}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                </select>
                            }
                        </td>
                        {
                            this.props.user.auth_level >= 3 && <th>{
                                //if user has auth_level of 3 or higher, they get edit access. otherwise, no
                                this.state.editMode === false ?
                                    // if not in edit mode, display an edit button to these users
                                    <button className='btn btn-warning'
                                        onClick={() => this.setState({
                                            editMode: true,
                                            lane: this.props.data.lane_number,
                                            year: this.props.data.year,
                                            active: this.props.data.active

                                        })} > Edit</button> :
                                    //if in edit mode, display a save button to these users
                                    <button className='btn btn-info' onClick={() => { this.saveEdits(); this.setState({ editMode: false }) }} > Save
                                    </button>}
                            </th>
                        }
                        {
                            this.props.user.auth_level >= 3 &&
                            //if auth_level is 3 or higher, display a delete button. otherwise, no.
                            <th><button className='btn btn-danger' onClick={() => this.deleteSwimmer()}>Delete</button></th>
                        }
                    </tr>
                }
            </tbody>
        )

    }
}

//get user and swimmer from redux 
const mapStateToProps = (state) => {
    return {
        user: state.user,
        swimmer: state.athlete
    }
}
//use router,connect to redux, and get props.
export default withRouter(connect(mapStateToProps)(SwimmerInfo))