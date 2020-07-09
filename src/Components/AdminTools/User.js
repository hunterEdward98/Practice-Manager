import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
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
                        <input value={this.state.user} onChange={(event) => this.handleChange(event, 'user')} /></td>
                }
                {this.state.editMode === false ?
                    <td>{this.props.data.auth_level}</td> :
                    <td>
                        <select className="form-control btn blk" id="exampleFormControlSelect1" value={this.state.auth} onChange={(event) => {
                            this.handleChange(event, 'auth')
                        }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            {this.props.user.auth_level >= 4 &&
                                <option value={3}>3</option>
                            }
                            {this.props.user.auth_level >= 5 &&
                                <option value={4}>4</option>
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
                    : <td colSpan={2}> CANNOT EDIT THIS USER</td>
                }
                <td>
                    {(this.props.user.auth_level > this.state.auth) &&
                        <button className='btn btn-danger'>
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