import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
class Header extends React.Component {
    //by default, the user will be assumed to not be logged in
    render() {
        return (
            <div className='header'>
                <div className='row'>
                    <div className='h1 col-9 col-md-10 text-left'>
                        {/* app title */}
                        Practice Manager 2020
                    </div>
                    {this.props.user.name ?
                        // if the user is logged in, display a log out button
                        <div className='col-3 col-md-2'><button className='col-12 btn signout' onClick={() => { this.props.dispatch({ type: 'LOGOUT' }); }}>Sign Out</button> </div> :
                        //if the user is not logged in, display a log in button
                        <Link to='/sign-in' className='col-3 col-md-2'><button className='col-12 btn signin' >Sign In</button></Link>}
                    {this.props.user.auth_level >= 6 ?
                        <nav className='col-12'>
                            <NavLink to='/super-admin' className=' blk col-12 tab h4'>Site Owner Page</NavLink></nav>
                        : <div className='col-12'>
                            {this.props.user.auth_level >= 3 ?
                                //only display the admin page if the user has an auth_level of 3 or above
                                <nav className='col-12'>
                                    <NavLink to='/set-manager' className=' blk col-12 tab col-sm-4'>Test Set Manager</NavLink>
                                    <NavLink to='/swimmer-search' className=' blk col-12 tab col-sm-4'>Swimmers</NavLink >
                                    <NavLink to='/super-admin' className=' blk col-12 tab col-sm-4'>Admin Tools</NavLink></nav> :
                                //otherwise display these 2. the reason we need to split this is because the tab size depends on how many there are
                                <nav className='col-12'>
                                    <NavLink to='/set-manager' className=' col-12 blk tab col-sm-6'>Test Set Manager</NavLink>
                                    <NavLink to='/swimmer-search' className=' blk col-12 tab col-sm-6'>Swimmers</NavLink ></nav>}
                        </div>
                    }
                </div>
            </div>
        )
    }
}
// get user from redux
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
//connect to redux, get props
export default connect(mapStateToProps)(Header)