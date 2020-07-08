import React from 'react';
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
        swimmerid: 0
    }
    getTimesForSwimmer(event) {
        this.props.dispatch({ type: 'FETCH_TIMES', payload: event })
    }
    getAthletes = () => {
        this.props.dispatch({ type: 'FETCH_ATHLETES', })
    }
    componentDidMount() {
        this.getAthletes();
    }
    setAthlete(event) {
        console.log('setting state to:', event)
        this.setState({
            swimmerid: event
        })
    }
    editTime() {
        return true;
    }
    render() {
        return (
            <div className='container '>
                <div className='row d-flex justify-content-left'>
                    <Select placeholder='SELECT SWIMMER...' className='col-12 col-lg-3' defaultValue={0} options={this.props.swimmer ? this.props.swimmer.map((x, i) => { return ({ label: x.athlete_name, value: x.id, key: x.id }) }) : {}} onChange={(event) => { this.setAthlete(event.value) }}>
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
                        <SwimmerInfo id={this.state.swimmerid} />
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
