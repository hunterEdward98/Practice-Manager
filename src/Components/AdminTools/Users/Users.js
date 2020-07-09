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
                <table className='table table-dark mb-5'>
                    <thead><tr><th>user name</th><th>authorization level</th></tr></thead>
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
        users: state.users
    }
}
export default connect(mapStateToProps)(AdminTools)