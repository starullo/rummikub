import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt_decode from "jwt-decode"

const PrivateRoute = ({
    component: Component, ...rest }) => {
const token = window.localStorage.getItem('gameToken')
let decoded;
if (token) {
    decoded = jwt_decode(token)
}


    return (
        <Route
        {...rest}
        render={props => {
            if (window.localStorage.getItem('gameToken')) {
                return <Component {...props} />
            } else {
                return <Redirect to='/login' />
            }
        }}
        />
    )
}

export default PrivateRoute