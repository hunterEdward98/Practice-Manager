import { withRouter } from "react-router"
import React from 'react'
const Redirect = (props) => {
    return (
        <div>{props.history.push('/home')}</div>
    )
}
export default withRouter((Redirect))