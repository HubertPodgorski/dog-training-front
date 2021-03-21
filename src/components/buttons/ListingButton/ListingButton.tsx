import React from 'react'
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import {routePaths} from "../../../Router";
import { useHistory } from 'react-router-dom';

const ListingButton = () => {
    const history = useHistory()

    return <Fab
        color="primary"
        aria-label="list"
        onClick={() => history.push(routePaths.list)}
    >
        <Icon>list</Icon>
    </Fab>
}

export default ListingButton