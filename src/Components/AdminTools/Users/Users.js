import React from 'react'
import { connect } from 'react-redux'
import User from './UserItem/User'
class AdminTools extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_USERS' })
    }
    render() {
        return (
            <div className='container my-5'>
                <h2>
                    {this.props.user.auth_level == 3 && <h3> YOU ARE SIGNED IN AS A: Coach</h3>}
                    {this.props.user.auth_level == 4 && <h3> YOU ARE SIGNED IN AS A: Head Coach</h3>}
                    {this.props.user.auth_level == 5 && <h3> YOU ARE SIGNED IN AS AN: Administrator</h3>}
                </h2>
                <table className='table table-dark mb-5'>
                    <thead><tr><th className='text-center'>User Name</th>
                        <th className='text-center'>Authorization</th>
                        <th className='text-center'>Edit</th>
                        <th className='text-center'>Delete</th>
                    </tr></thead>
                    {this.props.users[0] &&
                        <tbody>{this.props.users.map(x => <User data={x} />)}</tbody>
                    }
                    {console.log(this.props.users)}
                </table></div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users
    }
}
export default connect(mapStateToProps)(AdminTools)