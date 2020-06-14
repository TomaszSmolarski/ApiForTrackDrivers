import React from 'react'
import {Switch, Route} from "react-router-dom";
import {Home} from "./components/Home";
import {Me} from "./components/userComp/Me";
import {NewTransit} from "./components/transitComp/NewTransit";
import {TransitsList} from "./components/transitComp/TransitsList";
import {EditTransit} from "./components/transitComp/EditTransit";
import {About} from "./components/About";
import {RouteF} from "./components/routeComp/RouteF";
import {Logout} from "./components/userComp/Logout";
import {LoginForm} from "./components/userComp/LoginForm";
import {RegisterForm} from "./components/userComp/RegisterForm";
import {AuthRoute} from "./AuthRoute";
import {error404} from "./ErrorRoutes"

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path='/register'>
                    <RegisterForm/>
                </Route>
                <Route path='/login'>
                    <LoginForm/>
                </Route>
                <Route path='/about'>
                    <About/>
                </Route>
                <Route path='/route'>
                    <RouteF/>
                </Route>

                <AuthRoute path='/me' exact>
                    <Me/>
                </AuthRoute>
                <AuthRoute path='/list' exact>
                    <TransitsList/>
                </AuthRoute>
                <AuthRoute path='/transit/new' exact>
                    <NewTransit/>
                </AuthRoute>
                <AuthRoute path='/transit/:id' exact>
                    <EditTransit/>
                </AuthRoute>
                <AuthRoute path='/logout' exact>
                    <Logout/>
                </AuthRoute>
                <Route component={error404}/>

            </Switch>
        </>
    )
}
