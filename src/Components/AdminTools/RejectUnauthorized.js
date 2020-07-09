import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
const AdminTools = () => {
    return (<div className = 'h1'>You Don't have access to this page. Please <NavLink exact to='/sign-in' className='btn btn-info'>Sign In</NavLink> </div>)
}
export default connect()(AdminTools)