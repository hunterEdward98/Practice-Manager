import { withRouter } from "react-router"
import React from 'react'
const Redirect = (props) => {
    //when the user navigates to '/', they are taken to the sign in page
    return (
        <div>{props.history.push('/sign-in')}</div>
    )
}
export default withRouter((Redirect))