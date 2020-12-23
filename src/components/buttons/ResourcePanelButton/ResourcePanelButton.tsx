import { routePaths } from '../../../Router';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ResourcePanelButton.module.scss';

const ResourcePanelButton = () => {
    const history = useHistory();

    return (
        <Fab
            className={styles.button}
            color={'primary'}
            onClick={() => history.push(routePaths.resourcePanel)}
        >
            <Icon>addchart</Icon>
        </Fab>
    );
};

export default ResourcePanelButton;
