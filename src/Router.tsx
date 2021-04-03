import { BrowserRouter as ReactRouter, Switch, Route } from 'react-router-dom'
import MainList from './MainList/MainList'
import Configurator from './Configurator/Configurator'
import React from 'react'
import Calendar from './Calendar/Calendar'
import ResourcePanel from './ResourcePanel/ResourcePanel'
import Statistics from './Statistics/Statistics'

export const routePaths = {
  list: '/list',
  configurator: '/configurator',
  calendar: '/calendar',
  resourcePanel: '/resourcePanel',
  statistics: '/statistics',
}

export const resourcePaths = {
  dogs: `${routePaths.resourcePanel}/dogs`,
  people: `${routePaths.resourcePanel}/people`,
  peopleTasks: `${routePaths.resourcePanel}/peopleTasks`,
  dogTasks: `${routePaths.resourcePanel}/dogTasks`,
  events: `${routePaths.resourcePanel}/events`,
}

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
      <Route path={routePaths.resourcePanel}>
        <ResourcePanel />
      </Route>
      <Route path={routePaths.statistics}>
        <Statistics />
      </Route>

      <Route path='/'>
        <MainList />
      </Route>
    </Switch>
  </ReactRouter>
)

export default Router
