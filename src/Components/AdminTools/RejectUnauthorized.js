import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class AdminTools extends React.Component {

    render() {
        return (<div className='h1 text-center' > You Don't have access to this page.
            { this.props.user.name ?
                // if they are signed in, but have an authorization level of 0, tell them to ask for approval
                <> Please ask a coach or administrator to approve your request to join the organization</>
                :
                //if they aren't signed in, tell them to go to the sign in page
                <div className='my-3'><Link exact to='/sign-in' className='btn signout'>Sign In</Link>
                </div>}
        </div >)

    }
}

//get user from redux
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

//connect to redux, get some props
export default connect(mapStateToProps)(AdminTools)