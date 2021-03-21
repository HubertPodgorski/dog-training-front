import classnames from "classnames";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import React from "react";
import styles from './RefreshButton.module.scss'
import useFetchTaskList from '../../../hooks/useFetchTaskList';
import useSelector from '../../../hooks/useSelector';

// mby swipe down can refetch?
const RefreshButton = () => {
    const {isDataFetching} = useSelector(s => s.tasksStore)

    const fetchTaskList = useFetchTaskList()

    return <Fab
        color="primary"
        aria-label="refresh"
        onClick={async () => await fetchTaskList()}
        className={
            classnames(styles.refreshIcon, {[styles.refreshIconRotating]: isDataFetching})
        }
    >
        <Icon>autorenew</Icon>
    </Fab>
}

export default RefreshButton