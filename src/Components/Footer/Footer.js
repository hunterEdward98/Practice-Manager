import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'
class Footer extends React.Component {
    // local state handles the data we want to submit
    state = {
        reqFeatureData: '',
        bugData: ''
    }
    //function handles the submission of a BUG
    submitBug = () => {
        swal(`Submitting bug:${this.state.bugData}`)
        Axios.post('/api/email/bug', { data: this.state.bugData })
        this.setState({
            bugData: ''
        })
    }
    //function handles the submission of a Feature Request
    submitFeature = () => {
        swal(`Submitting feature request: ${this.state.reqFeatureData}`)
        Axios.post('/api/email/feature', { data: this.state.reqFeatureData })
        this.setState({
            reqFeatureData: ''
        })
    }
    //when the component receives props, set the state to the user in the props.
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
                        <textarea className='p form-control' placeholder='Please Provide a description of the bug' onChange={(event) => this.setState({ bugData: event.target.value })} value={this.state.bugData} />
                        {this.props.user.name ?
                            //if they are signed in, they will have access to report a bug
                            <button onClick={() => this.submitBug()} className='btn btn-secondary'>
                                Send Bug Report
                                <span className='glyphicon glyphicon-cog'>
                                </span>
                            </button>
                            :
                            // if they aren't signed in, they can't report a bug, because we use the username for the report
                            // so we want to give them a link to the sign in page
                            <Link to='/sign-in'>
                                <button className='btn signin'>
                                    Sign In
                                    <span className='glyphicon glyphicon-cog'>
                                    </span>
                                </button>
                            </Link>}
                    </div>
                    <div className='h3 col-6'>
                        Request A Feature
                        <textarea className='p form-control' placeholder={`Please Provide a description of the feature you'd like to see`} onChange={(event) => this.setState({ reqFeatureData: event.target.value })} value={this.state.reqFeatureData} />
                        {this.props.user.name ?
                            //if they are signed in, they will have access to request a feature
                            <button onClick={() => this.submitFeature()} className='btn btn-secondary'>
                                Send Bug Report <span className='glyphicon glyphicon-cog'>
                                </span>
                            </button>
                            :
                            // if they aren't signed in, they can't request a feature, because we use the username for the request
                            // so we want to give them a link to the sign in page
                            <Link to='/sign-in'>
                                <button className='btn signin'>
                                    Sign In
                                    <span className='glyphicon glyphicon-cog'>
                                    </span>
                                </button>
                            </Link>}
                    </div>
                    <div className='col-12 h3 row'>
                        <div className='col-12'>CONTACT ME:</div>
                        <div className='h5 col-6'>
                            <a href='https://www.linkedin.com/in/hunter-e-scheel'> LinkedIn </a>
                        </div>
                        <div className='h5 col-6'>
                            <a href='https://hunteredward98.github.io'>Website</a>
                        </div>
                    </div>
                </div>
            </footer >
        )
    }
}
// get user from redux
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
// connect to redux, get props
export default connect(mapStateToProps)(Footer)