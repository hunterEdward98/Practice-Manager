import React from 'react'
import { connect } from 'react-redux'
import { Route, NavLink, } from 'react-router-dom'
import Users from './Users/Users'
import AddSwimmerForm from './AddSwimmerForm/AddSwimmerForm'
import AddEvent from './AddEvent/AddEvent'
class AdminTools extends React.Component {
    render() {
        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-8'>
                        {/* this page has 3 sub-routes. we need a navbar to suggest that. */}
                        <NavLink exact to='/super-admin/users' className='col-12 col-sm-4 h2 btn adminNav'>Users</NavLink>
                        <NavLink exact to='/super-admin/swimmers' className='col-12 col-sm-4 h2 btn adminNav'>Add Swimmers</NavLink>
                        <NavLink exact to='/super-admin/sets' className='col-12 col-sm-4 h2 btn adminNav'>Add Sets</NavLink>
                    </div>
                </div>
                {/* this page needs 3 sub-routes. one for user edits, one for swimmers, and one for events*/}
                <Route path='/super-admin/users'><Users /></Route>
                <Route path='/super-admin/swimmers'><AddSwimmerForm /></Route>
                <Route path='/super-admin/sets'><AddEvent /></Route>
            </div>
        )
    }
}
//get all users from redux
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
//connect to redux, get props
export default connect(mapStateToProps)(AdminTools)