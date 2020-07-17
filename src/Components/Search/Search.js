import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import SwimmerInfo from './SwimmerInfo';
import Time from './Time'
import './Search.css'
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Search extends React.Component {
    // store input field edits
    state = {
        description: '',
        image_url: '',
        swimmerData: {}
    }
    //fetch the times for a specific swimmer. default: 0
    getTimesForSwimmer(event) {
        this.props.dispatch({ type: 'FETCH_TIMES', payload: event })
    }
    resetSwimmer = () => {
        this.setState({
            swimmerData: {}
        })
    }
    //get all athletes when the component mounts
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ATHLETES' })
    }
    //clear times when component unmounts
    componentWillUnmount() {
        this.props.dispatch({ type: 'FETCH_TIMES', payload: 0 })
    }
    //set the athlete to the selected value
    setAthlete(event) {
        this.setState({
            swimmerData: event
        })
    }
    render() {
        return (
            <div className='mt-5'>
                <h2>SELECT A SWIMMER</h2>
                <div className='row justify-content-center'>
                    {/* A searchbar reducing dropdown menu, listing all athletes */}
                    <Select placeholder='SELECT SWIMMER...' className='col-12 col-lg-3' defaultValue={0}
                        options={this.props.swimmer ? this.props.swimmer.map((x, i) => {
                            return ({ label: x.athlete_name, value: i, key: x.id, data: x.athlete_id })
                        }) : {}}
                        onChange={(event) => {
                            console.log(event.value)
                            this.setAthlete(event.value);
                            this.getTimesForSwimmer(this.props.swimmer[event.value].id)
                        }}>
                    </Select>
                </div>
                <div className='container row justify-content-center'>
                    <small className='mt-5'>Swimmer Info</small>
                    <table className='table dark'>
                        <thead>
                            <tr>
                                <th scope='col'>Active?</th>
                                <th scope='col'>Year</th>
                                <th scope='col'>Lane</th>
                                {this.props.user.auth_level >= 3 && <th>Edit</th>}
                                {this.props.user.auth_level >= 3 && <th>Delete</th>}
                            </tr>
                        </thead>
                        {/* the tbody will be out SwimmerInfo object, which will be a table row where the user can edit swimmer info, or delete the swimmer*/}
                        <SwimmerInfo delFunction={this.resetSwimmer} data={this.props.swimmer[this.state.swimmerData] || ''} org_id={this.props.user.org_id} />
                    </table>
                    <small className='mt-5'>Swim History</small>
                    <table className='table dark col-12 col-lg-11'>
                        <thead>
                            <tr>
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
                            {/* the tbody will be our Time object, which will be a table row where the user can edit or delete the time*/}
                            {console.log(this.props.time)}
                            {this.props.time.map(x =>
                                <Time name={x.event_name} eventId={x.event_id} swimTime={x.swim_time} date={moment(x.date).format('MMMM do YYYY LTS')} id={x.id} athId={this.props.swimmer[this.state.swimmerData] ? this.props.swimmer[this.state.swimmerData].id : 0} >
                                </Time>)}
                        </tbody>
                    </table>
                </div >
            </div >
        )
    }

}

//get time, user, swimmer from redux
const mapStateToProps = (state) => {
    return {
        time: state.time,
        user: state.user,
        swimmer: state.athlete
    }
}
//connect to redux, get props
export default connect(mapStateToProps)(Search);
