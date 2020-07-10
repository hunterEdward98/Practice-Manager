import React from 'react'
import { connect } from 'react-redux'
class User extends React.Component {
    state = {
        editMode: false,
        users: [],
        data: {},
        user: '',
    }
    componentDidMount() {
        console.log(this.props.data)
        this.setState({
            data: this.props.data,
            auth: this.props.data.auth_level,
            user: this.props.data.name
        })
    }
    deleteUser = () => {
        const obj = {
            auth: this.state.auth,
            id: this.props.data.id
        }
        this.props.dispatch({ type: 'DELETE_USER', payload: obj })
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    submitChanges = () => {
        const obj = {
            auth: this.state.auth,
            user: this.state.user,
            id: this.props.data.id
        }
        this.props.dispatch({ type: 'EDIT_USER', payload: obj })
    }
    render() {
        return (
            <tr>
                {this.state.editMode === false ?
                    <td>{this.props.data.name}</td>
                    :
                    <td>
                        <input value={this.state.user} className='form-control blk' onChange={(event) => this.handleChange(event, 'user')} /></td>
                }
                {this.state.editMode === false ?
                    <td>
                        {this.props.data.auth_level === 1 && <p>athlete</p>}
                        {this.props.data.auth_level === 2 && <p>manager</p>}
                        {this.props.data.auth_level === 3 && <p>coach</p>}
                        {this.props.data.auth_level === 4 && <p>head coach</p>}
                        {this.props.data.auth_level === 5 && <p>administrator</p>}
                    </td> :
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
                        </select>
                    </td>
                }{this.props.user.auth_level > this.state.auth ?
                    <td>
                        {this.state.editMode === false ?
                            <button className='btn btn-warning' onClick={() => this.setState({ editMode: true })}>
                                Edit
                        </button> :
                            <button className='btn btn-info' onClick={() => {
                                this.submitChanges()
                                this.setState({ editMode: false })
                            }}>
                                Save
                        </button>}</td>
                    : <td colSpan={2}>
                        <span class="glyphicon glyphicon-lock" ></span></td>
                }
                <td>
                    {(this.props.user.auth_level > this.state.auth) &&
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