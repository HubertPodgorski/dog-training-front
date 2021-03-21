import Fab from "@material-ui/core/Fab";
import styles from './AddNewTaskButton.module.scss'
import Icon from "@material-ui/core/Icon";
import React from "react";
import useAddTask from '../../../hooks/useAddTask';

const AddNewTaskButton = () => {
    const addNewTask = useAddTask()

    return <Fab
        color="primary"
        aria-label="add"
        onClick={addNewTask}
        className={styles.addNewIcon}
    >
        <Icon>add</Icon>
    </Fab>
}

export default AddNewTaskButton