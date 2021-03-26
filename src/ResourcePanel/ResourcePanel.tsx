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
import { BrowserRouter as ReactRouter, Route, Switch, Link } from 'react-router-dom'
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
          <Link to={resourcePaths.dogs}>
            <ListItem
              button
              // FIXME: change to route match
              // selected={resourceType === 'dogs'}
            >
              <ListItemIcon>
                <Pets />
              </ListItemIcon>
              <ListItemText primary='Psy' />
            </ListItem>
          </Link>

          <Link to={resourcePaths.dogTasks}>
            <ListItem
              button
              // selected={resourceType === 'dogTasks'}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary='Zadania psów' />
            </ListItem>
          </Link>

          <Link to={resourcePaths.people}>
            <ListItem
              button
              // selected={resourceType === 'people'}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary='Ludzie' />
            </ListItem>
          </Link>

          <Link to={resourcePaths.peopleTasks}>
            <ListItem
              button
              // selected={resourceType === 'peopleTasks'}
            >
              <ListItemIcon>
                <DirectionsRun />
              </ListItemIcon>
              <ListItemText primary='Zadania ludzi' />
            </ListItem>
          </Link>

          <Link to={resourcePaths.events}>
            <ListItem
              button
              // selected={resourceType === 'events'}
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Wydarzenia' />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <ReactRouter>
          <Switch>
            {console.log('resourcePaths.people => ', resourcePaths.people)}
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
        </ReactRouter>
      </Card>
    </div>
  )
}

export default ResourcePanel
