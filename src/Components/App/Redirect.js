import { withRouter } from "react-router"
import React from 'react'
const Redirect = (props) => {
    return (
        <div>{props.history.push('/sign-in')}</div>
    )
}
export default withRouter((Redirect))