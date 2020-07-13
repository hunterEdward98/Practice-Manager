import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'
class Footer extends React.Component {
    state = {
        reqFeatureData: '',
        bugData: ''
    }
    submitBug = () => {
        swal(`Submitting bug:${this.state.bugData}`)
        Axios.post('/api/email/bug', { data: this.state.bugData })
        this.setState({
            bugData: ''
        })
    }
    submitFeature = () => {
        swal(`Submitting feature request: ${this.state.reqFeatureData}`)
        Axios.post('/api/email/feature', { data: this.state.reqFeatureData })
        this.setState({
            reqFeatureData: ''
        })
    }
    componentWillReceiveProps() {
        this.setState({
            user: this.props.user
        })
    }
    render() {
        return (
            <footer className='footer blk mt-5 container'>
                <div className='row justify-content-center'>
                    <div className='h3 col-6'>
                        Report A Bug
                        <textarea className='p form-control' placeholder='Please Provide a description of the bug' onChange={(event) => this.setState({ bugData: event.target.value })} value={this.state.bugData} />
                        {this.props.user.name ? <button onClick={() => this.submitBug()} className='btn btn-secondary'>Send Bug Report <span className='glyphicon glyphicon-cog'> </span></button> : <Link to='/sign-in'><button className='btn signin'>Sign In <span className='glyphicon glyphicon-cog'> </span></button></Link>}
                    </div>
                    <div className='h3 col-6'>
                        Request A Feature
                        <textarea className='p form-control' placeholder={`Please Provide a description of the feature you'd like to see`} onChange={(event) => this.setState({ reqFeatureData: event.target.value })} value={this.state.reqFeatureData} />
                        {this.props.user.name ? <button onClick={() => this.submitFeature()} className='btn btn-secondary'>Send Bug Report <span className='glyphicon glyphicon-cog'> </span></button> : <Link to='/sign-in'><button className='btn signin'>Sign In <span className='glyphicon glyphicon-cog'> </span></button></Link>}
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
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Footer)