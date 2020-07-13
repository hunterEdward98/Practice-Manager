import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
const AdminTools = () => {
    return (<div className = 'h1'>You Don't have access to this page. Please <Link exact to='/sign-in' className='btn btn-info'>Sign In</Link> </div>)
}
export default connect()(AdminTools)