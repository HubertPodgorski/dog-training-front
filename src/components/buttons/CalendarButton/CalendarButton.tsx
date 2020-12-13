import React from 'react'
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import {routePaths} from "../../../Router";
import { useHistory } from 'react-router-dom';

const CalendarButton = () => {
    const history = useHistory()

    return <Fab
        color="primary"
        aria-label="calendar"
        onClick={() => history.push(routePaths.calendar)}
    >
        <Icon>today</Icon>
    </Fab>
}

export default CalendarButton