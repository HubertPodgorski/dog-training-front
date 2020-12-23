import { BrowserRouter as ReactRouter, Switch, Route } from 'react-router-dom';
import MainList from './MainList/MainList';
import Configurator from './Configurator/Configurator';
import React from 'react';
import Calendar from './Calendar/Calendar';

export const routePaths = {
    list: '/list',
    configurator: '/configurator',
    calendar: '/calendar',
    dogs: '/dogs',
    dogTasks: '/dogTasks',
    peopleTasks: '/peopleTasks',
    people: '/people',
};

const Router = () => (
    <ReactRouter>
        <Switch>
            <Route path={routePaths.list}>
                <MainList />
            </Route>
            <Route path={routePaths.configurator}>
                <Configurator />
            </Route>
            <Route path={routePaths.calendar}>
                <Calendar />
            </Route>
            <Route path={routePaths.dogs}>
                <Dogs />
            </Route>
            <Route path={routePaths.dogTasks}>
                <DogTasks />
            </Route>
            <Route path={routePaths.peopleTasks}>
                <PeopleTasks />
            </Route>
            <Route path={routePaths.people}>
                <People />
            </Route>
            <Route path="/">
                <MainList />
            </Route>
        </Switch>
    </ReactRouter>
);

export default Router;
