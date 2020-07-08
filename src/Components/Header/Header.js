import React from 'react'
import swal from 'sweetalert'
import { NavLink } from 'react-router-dom'
class Header extends React.Component {
    render() {
        return (<div>
            <div className='container'>
                <div className='row'>
                    <div className='h1 col-10 text-left'>
                        Practice Manager
                    </div>
                    <NavLink exact to='/sign-in' className='col-2'><button className='col-12 btn signin' >Sign In</button></NavLink>
                    <NavLink exact to='/' className='btn blk col-3'>Home</NavLink><NavLink exact to='/set-manager' className='btn blk col-3'>Test Set Manager</NavLink><NavLink exact to='/swimmer-search' className='btn blk col-3'>Swimmers</NavLink><NavLink exact to='/super-admin' className='btn blk col-3'>Admin Tools</NavLink>
                </div>
            </div>
        </div >
        )
    }
}
export default Header