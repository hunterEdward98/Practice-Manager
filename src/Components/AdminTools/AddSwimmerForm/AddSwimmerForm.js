import React from 'react'
import { connect } from 'react-redux'
class User extends React.Component {
    state = {
        editMode: false,
        users: [],
        data: {},
        user: '',
        name: '',
        lane: '1',
        year: ''
    }
    submitNewSwimmer = (event) => {
        event.preventDefault()
        this.props.dispatch({ type: 'ADD_ATHLETE', payload: { name: this.state.name, lane: this.state.lane, year: this.state.year } })
        this.setState({
            name: '',
            lane: 1,
            year: ''
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
                    <small>Enter The Swimmer's Name</small>
                    <input required placeholder='Swimmer Name' className='form-control blk col-12' value={this.state.name} onChange={(event) => this.handleChange(event, 'name')}></input>

                </div>
                <div className='col-12 col-md-4'>
                    <small>Enter the Lane Number</small>
                    <select className='form-control blk col-12' type="number" value={this.state.lane} onChange={(event) => this.handleChange(event, 'lane')}>
                        <option selected="selected" disabled="disabled">Select a Lane</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div className='col-12 col-md-4'>
                    <small>Enter the Swimmer's Year/Grade</small>
                    <input required placeholder='Swimmer Year' className='form-control blk col-12' type="number" value={this.state.year} onChange={(event) => this.handleChange(event, 'year')}></input>
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