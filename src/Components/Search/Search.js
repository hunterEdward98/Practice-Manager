import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import SwimmerInfo from './SwimmerInfo';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Search extends React.Component {

    state = {
        // ourObj: [],
        description: '',
        image_url: '',
        swimmer: [''],
    }
    getTimesForSwimmer(event) {
        this.props.dispatch({ type: 'FETCH_TIMES', payload: event })
    }
    getAthletes = () => {
        this.props.dispatch({ type: 'FETCH_ATHLETES', })
    }
    deleteTime = (targetID, athId) => {
        this.props.dispatch({ type: 'DELETE_TIME', payload: { targetID, athId } })
    }
    deleteAthlete = () => { }
    componentDidMount() {
        this.getAthletes();
    }
    setAthlete(event) {
        this.setState({
            swimmer: [event]
        })
    }
    editTime() {
        return true;
    }
    render() {
        return (
            <div className='container '>
                <div className='row d-flex justify-content-left'>
                    <Select placeholder='SELECT SWIMMER...' className='col-12 col-lg-3' options={this.props.swimmer ? this.props.swimmer.map((x, i) => { return ({ data: x, label: x.athlete_name, value: x.id }) }) : {}} onChange={(event) => { this.getTimesForSwimmer(event.value); this.setAthlete(event.data) }}>
                    </Select> </div><div className='row d-flex justify-content-center'>
                    <table className='table table-dark col-12 col-lg-11'>
                        <thead>
                            <tr>
                                <th scope='col' colSpan={6}>Swimmer Info</th>
                            </tr>
                            <tr>
                                <th scope='col'>Active?</th>
                                <th scope='col'>Year</th>
                                <th scope='col'>Lane</th>
                                {this.props.user.auth_level >= 3 && <th>Edit</th>}
                                {this.props.user.auth_level >= 3 && <th>Delete</th>}
                            </tr>
                        </thead>
                        {console.log(this.state.swimmer[0])}
                        <SwimmerInfo data={this.state.swimmer[0]} />
                    </table>
                    <table className='table table-dark col-12 col-lg-11'>
                        <thead>
                            <tr>
                                <th scope='col' colSpan={6}>Swim History</th>
                            </tr>
                            <tr>
                                <th scope='col'>Event</th>
                                <th scope='col'>Time</th>
                                <th scope='col'>Date</th>
                                {this.props.user.auth_level >= 3 && <th>Edit</th>}
                                {this.props.user.auth_level >= 3 && <th>Delete</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.time.map(x =>
                                <tr>
                                    {console.log(x)}
                                    <th scope='col'>{x.event_name}</th>
                                    <th scope='col'>{x.swim_time}</th>
                                    <th scope='col'>{moment(x.date).format('MMMM Do YYYY LTS')}</th>
                                    {this.props.user.auth_level >= 3 && <th><button className='btn btn-warning' onClick={() => this.editTime(x)}> Edit </button></th>}
                                    {this.props.user.auth_level >= 3 && <th><button className='btn btn-danger' onClick={() => this.deleteTime(x.id, x.athlete_id)}>Delete</button></th>}
                                </tr>)}
                        </tbody>
                    </table>
                </div >
            </div >
        )
    }

}


const mapStateToProps = (state) => {
    return {
        time: state.time,
        ourObj: state.ourObj,
        user: state.user,
        swimmer: state.athlete
    }
}

export default connect(mapStateToProps)(Search);
