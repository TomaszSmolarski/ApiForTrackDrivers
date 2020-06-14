import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";

export const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        Cookies.remove("jwt2");
        history.push("/");
    });
    return (<></>);


};
