import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class AdminTools extends React.Component {
    render() {
        return (<div className='h1' > You Don't have access to this page.
            { this.props.user.name ?
                <> Please ask a coach or administrator to approve your request to join the organization</>
                :
                <>
                    Please
                    <Link exact to='/sign-in' className='btn btn-info'>
                        Sign In
                </Link>
                </>}
        </div >)

    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(AdminTools)