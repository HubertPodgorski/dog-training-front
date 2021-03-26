import React from 'react'
import { Card } from '@material-ui/core'
import styles from './ResourcePanel.module.scss'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import {
  Pets,
  GroupAdd,
  DirectionsRun,
  Event as EventIcon,
  List as ListIcon,
} from '@material-ui/icons'
import ButtonBar from '../components/ButtonBar/ButtonBar'
import { Route, Switch, NavLink } from 'react-router-dom'
import { resourcePaths } from '../Router'
import Dogs from './Dogs/Dogs'
import People from './People/People'
import PeopleTasks from './PeopleTasks/PeopleTasks'
import DogTasks from './DogTasks/DogTasks'
import Events from './Events/Events'

const ResourcePanel = () => {
  return (
    <div>
      <ButtonBar />

      <Card className={styles.wrapper}>
        <List component='nav'>
          <NavLink to={resourcePaths.dogs}>
            <ListItem button>
              <ListItemIcon>
                <Pets />
              </ListItemIcon>
              <ListItemText primary='Psy' />
            </ListItem>
          </NavLink>

          <NavLink activeClassName={styles.active} to={resourcePaths.dogTasks}>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary='Zadania psów' />
            </ListItem>
          </NavLink>

          <NavLink activeClassName={styles.active} to={resourcePaths.people}>
            <ListItem button>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary='Ludzie' />
            </ListItem>
          </NavLink>

          <NavLink activeClassName={styles.active} to={resourcePaths.peopleTasks}>
            <ListItem button>
              <ListItemIcon>
                <DirectionsRun />
              </ListItemIcon>
              <ListItemText primary='Zadania ludzi' />
            </ListItem>
          </NavLink>

          <NavLink activeClassName={styles.active} to={resourcePaths.events}>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Wydarzenia' />
            </ListItem>
          </NavLink>
        </List>

        <Divider />

        <Switch>
          <Route exact path={resourcePaths.people}>
            <People />
          </Route>
          <Route exact path={resourcePaths.dogs}>
            <Dogs />
          </Route>
          <Route exact path={resourcePaths.peopleTasks}>
            <PeopleTasks />
          </Route>
          <Route exact path={resourcePaths.dogTasks}>
            <DogTasks />
          </Route>
          <Route exact path={resourcePaths.events}>
            <Events />
          </Route>
        </Switch>
      </Card>
    </div>
  )
}

export default ResourcePanel
