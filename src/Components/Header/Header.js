import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
class Header extends React.Component {
    state = { loggedIn: false }
    componentWillReceiveProps() {
        this.setState({
            user: this.props.user
        })
    }
    render() {
        return (<div>
            <div className='container'>
                <div className='row'>
                    <div className='h1 col-9 col-md-10 text-left'>
                        Practice Manager
                    </div>
                    {this.props.user.auth_level ?
                        <div className='col-3 col-md-2'><button className='col-12 btn signout' onClick={() => { this.props.dispatch({ type: 'LOGOUT' }); this.setState({ loggedIn: false }) }}>Sign Out</button> </div> :
                        <Link exact to='/sign-in' className='col-3 col-md-2'><button className='col-12 btn signin' onClick={() => this.setState({ loggedIn: true })}>Sign In</button></Link>}
                    {this.props.user.auth_level >= 3 ?
                        <nav className='col-12'>
                            <NavLink exact to='/' className='btn blk col-12 col-md-3'>Home</NavLink>
                            <NavLink exact to='/set-manager' className='btn blk col-12 col-md-3'>Test Set Manager</NavLink>
                            <NavLink exact to='/swimmer-search' className='btn blk col-12 col-md-3'>Swimmers</NavLink >
                            <NavLink exact to='/super-admin' className='btn blk col-12 col-md-3'>Admin Tools</NavLink></nav> :
                        <nav className='col-12'>
                            <NavLink exact to='/' className='btn blk col-12 col-sm-4'>Home</NavLink>
                            <NavLink exact to='/set-manager' className='btn col-12 blk col-sm-4'>Test Set Manager</NavLink>
                            <NavLink exact to='/swimmer-search' className='btn blk col-12 col-sm-4'>Swimmers</NavLink ></nav>}
                </div>
            </div>
        </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Header)