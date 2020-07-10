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
        return (
            <footer className='footer blk mt-5'>
                <div className='row justify-content-center'>
                    <div className='h3 col-6'>
                        Report A Bug
                        <input className='p form-control' placeholder='Please provide your name' />
                        <textarea className='p form-control' placeholder='Please Provide a description of the bug' />
                        <button className='btn btn-secondary'>Send Bug Report <span className='glyphicon glyphicon-cog'> </span></button>
                    </div>
                    <div className='h3 col-6'>
                        Request A Feature
                        <input className='p form-control' placeholder='Title' />
                        <textarea className='p form-control' placeholder={`Please Provide a description of the feature you'd like to see`} />
                        <button className='btn btn-secondary'>Send Request <span className='glyphicon glyphicon-cog'> </span></button>
                    </div>
                    <div className='col-6 h3 text-left'>CONTACT ME:
                    <div className='col-12 h5 mt-1 row'><div className='col-10'><u><i>Email:</i></u> Hunter.Scheel@outlook.com</div></div>
                        <div className='col-12 h5 mt-1'><u><i><a href='https://www.linkedin.com/in/hunter-e-scheel'>LinkedIn:</a></i></u></div>
                        <div className='col-12 h5 mt-1'><u><i><a href='https://hunteredward98.github.io'>Website</a></i></u></div></div>
                </div>
            </footer >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Header)