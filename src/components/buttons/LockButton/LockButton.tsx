import {routePaths} from "../../../Router";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import React from "react";
import {useHistory} from "react-router-dom";
import styles from './LockButton.module.scss'

interface Props {
    variant: 'listing' | 'configurator'
}

const LockButton = ({variant}: Props) => {
    const history = useHistory()
    console.log("variant => ", variant)
    return <Fab
        color={variant === 'listing' ? 'secondary' : 'primary'}
        aria-label="lock-unlock"
        onClick={() => history.push(variant === 'listing' ? routePaths.configurator : routePaths.list)}
        className={styles.lockIcon}
    >
        <Icon>{variant === 'listing' ? 'lock' : 'lock_open'}</Icon>
    </Fab>
}

export default LockButton