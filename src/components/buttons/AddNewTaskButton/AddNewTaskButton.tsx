import Fab from "@material-ui/core/Fab";
import styles from './AddNewTaskButton.module.scss'
import Icon from "@material-ui/core/Icon";
import React from "react";
import {TrainingsConsumer} from "../../../TrainingsContext";

const AddNewTaskButton = () => {
    return <TrainingsConsumer>
        {({addNewTask}) =>
            <Fab
                color="primary"
                aria-label="add"
                // TODO: add task
                onClick={addNewTask}
                className={styles.addNewIcon}
            >
                <Icon>add</Icon>
            </Fab>}
    </TrainingsConsumer>
}

export default AddNewTaskButton