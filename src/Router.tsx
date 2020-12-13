import {
    BrowserRouter as ReactRouter,
    Switch,
    Route
} from "react-router-dom";
import MainList from "./MainList/MainList";
import Configurator from "./Configurator/Configurator";
import React from "react";
import Calendar from "./Calendar/Calendar";

export const routePaths = {
    'list': '/list',
    'configurator': '/configurator',
    'calendar': '/calendar',
}

const Router  = () => (
    <ReactRouter>
        <Switch>
            <Route path={routePaths.list}>
                <MainList/>
            </Route>
            <Route path={routePaths.configurator}>
                <Configurator />
            </Route>
            <Route path={routePaths.calendar}>
                <Calendar />
            </Route>
            <Route path="/">
                <MainList/>
            </Route>
        </Switch>
    </ReactRouter>
)

export default Router