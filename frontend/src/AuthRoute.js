import React from 'react'
import {Redirect, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';


export const AuthRoute = ({children, ...rest}) => {
    const token = Cookies.get('jwt');
    const info = Cookies.get('jwt2');

    if (!token || !info) return <Redirect to={`/login`}/>;

    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;

    if (decoded.exp <= now) {
        Cookies.remove('jwt2');

        return <Redirect to={`/login`}/>;
    }
    return <Route {...rest}>{children}</Route>
}
