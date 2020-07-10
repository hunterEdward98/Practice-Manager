import React from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import Users from './Users/Users'
import AddSwimmerForm from './AddSwimmerForm/AddSwimmerForm'
class AdminTools extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_USERS' })
    }
    render() {
        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-8'>
                        <NavLink exact to='/super-admin/users' className='col-12 col-sm-4 h2 btn adminNav'>Users</NavLink>
                        <NavLink exact to='/super-admin/swimmers' className='col-12 col-sm-4 h2 btn adminNav'>Add Swimmers</NavLink>
                        <NavLink exact to='/super-admin/sets' className='col-12 col-sm-4 h2 btn adminNav'>Add Sets</NavLink>
                    </div>
                </div>
                <Route path='/super-admin/users'><Users /></Route>
                <Route path='/super-admin/swimmers'><AddSwimmerForm /></Route>
                <Route path='/super-admin/sets'><h2>NO FUNCTIONALITY YET</h2></Route>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(AdminTools)