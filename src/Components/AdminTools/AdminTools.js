import React from 'react'
import { connect } from 'react-redux'
import User from './User'
class AdminTools extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_USERS' })
    }
    render() {
        return (
            <div className='container my-5'>
                <h2>Users</h2>
                <table className='table table-dark mb-5'>
                    <thead><tr><th>userName</th><th>auth_level</th></tr></thead>
                    {this.props.users[0] &&
                        <tbody>{this.props.users.map(x => <User data={x} />)}</tbody>
                    }9
                    {console.log(this.props.users)}
                </table></div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(AdminTools)