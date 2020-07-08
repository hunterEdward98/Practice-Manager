import React from 'react'
import { connect } from 'react-redux'
class SwimmerInfo extends React.Component {
    state = {
        editMode: false,
        active: true,
        year: 0,
        lane: 0,
    }
    componentWillReceiveProps() {
        this.setState({
            active: this.props.data.active,
            year: this.props.data.year,
            lane: this.props.data.lane_number,
        })
    }
    saveEdits() {
        const obj = {
            active: this.state.active,
            year: this.state.year,
            lane: this.state.lane,
            id: this.props.data.id
        }
        console.log(obj)
        this.props.dispatch({ type: 'EDIT_ATHLETE', payload: obj })
    }
    handleChange = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value
        })

    }
    render() {
        return (
            <tbody>
                {this.props.data !== '' &&
                    <tr>
                        {console.log(this.props.data)}
                        <td>
                            {this.state.editMode == false ?
                                String(this.state.active) :
                                <select value={this.state.active} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'active');
                                }}>
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select>
                            }
                        </td>
                        <td>
                            {this.state.editMode == false ?
                                String(this.state.year) :
                                <select value={this.state.year} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'year');
                                }}>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </select>
                            }
                        </td>
                        <td>
                            {this.state.editMode == false ?
                                String(this.state.lane) :
                                <select value={this.state.lane} className="form-control btn blk" id="exampleFormControlSelect1" onChange={(event) => {
                                    this.handleChange(event, 'lane');
                                }}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                </select>
                            }
                        </td>
                        {
                            this.props.user.auth_level >= 3 && <th>{this.state.editMode == false ? <button className='btn btn-warning' onClick={() => this.setState({ editMode: true })} > Edit</button> : <button className='btn btn-info' onClick={() => { this.saveEdits(); this.handleChange({ target: { value: false } }, 'editMode') }} > Save</button>}</th>}
                        {
                            this.props.user.auth_level >= 3 && <th><button className='btn btn-danger'>Delete</button></th>
                        }
                    </tr>
                }
            </tbody>
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
export default connect(mapStateToProps)(SwimmerInfo)