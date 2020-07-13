import React from 'react'
import { connect } from 'react-redux'
import User from './UserItem/User'
class AdminTools extends React.Component {
    //when the component mounts, get all users from the database.
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_USERS' })
    }
    render() {
        return (
            <div className='container my-5'>
                <h2>
                    {/* tell the user what their authorization level is */}
                    {this.props.user.auth_level == 3 && <h3> YOU ARE SIGNED IN AS A: Coach</h3>}
                    {this.props.user.auth_level == 4 && <h3> YOU ARE SIGNED IN AS A: Head Coach</h3>}
                    {this.props.user.auth_level == 5 && <h3> YOU ARE SIGNED IN AS AN: Administrator</h3>}
                    {this.props.user.auth_level == 6 && <h3> YOU ARE SIGNED IN AS THE: Site Owner</h3>}
                </h2>
                {/* display a table. */}
                <table className='table table-dark mb-5'>
                    <thead><tr><th className='text-center'>User Name</th>
                        <th className='text-center'>Authorization</th>
                        <th className='text-center'>Edit</th>
                        <th className='text-center'>Delete</th>
                    </tr></thead>
                    {/* if there are are any users in the global state, map them into the table as User objects */}
                    {this.props.users[0] &&
                        <tbody>{this.props.users.map(x => <User data={x} />)}</tbody>
                    }
                </table></div>
        )
    }
}
//get user and all users from redux
const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users
    }
}
// connect to redux, get props
export default connect(mapStateToProps)(AdminTools)