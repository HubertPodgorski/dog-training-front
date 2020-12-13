import classnames from "classnames";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import React from "react";
import styles from './RefreshButton.module.scss'
import { TrainingsConsumer } from "../../../TrainingsContext";

// mby swipe down can refetch?
const RefreshButton = () => {
    return <TrainingsConsumer>
        {({fetchTaskList, dataFetching}) => <Fab
            color="primary"
            aria-label="refresh"
            onClick={async () => await fetchTaskList()}
            className={
                classnames(styles.refreshIcon, {[styles.refreshIconRotating]: dataFetching})
            }
        >
            <Icon>autorenew</Icon>
        </Fab>}
    </TrainingsConsumer>
}

export default RefreshButton