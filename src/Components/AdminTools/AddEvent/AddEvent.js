import React from 'react'
import { connect } from 'react-redux'
class User extends React.Component {
    state = {
        user: '',
        name: '',
    }
    submitNewSwimmer = (event) => {
        event.preventDefault()
        this.props.dispatch({ type: 'ADD_EVENT', payload: { name: this.state.name, } })
        this.setState({
            name: '',
        })
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })
    }
    render() {
        return (
            <form className='my-4 justify-content-center row' onSubmit={(event) => this.submitNewSwimmer(event)}>
                <div className='col-12 col-md-4'>
                    <small>Enter The Event Name</small>
                    <input required placeholder='Event Name' className='form-control blk col-12' value={this.state.name} onChange={(event) => this.handleChange(event, 'name')}></input>
                </div>
                <button type='submit' className='btn btn-success'>Add Swimmer</button>
            </form >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(User)