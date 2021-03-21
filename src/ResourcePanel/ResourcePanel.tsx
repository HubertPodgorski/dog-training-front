import React, { useState } from 'react';
import { Button, Card, IconButton, Modal } from '@material-ui/core';
import { apiRoutes } from '../helpers/apiRoutes';
import styles from './ResourcePanel.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
    Pets,
    Delete,
    GroupAdd,
    DirectionsRun,
    List as ListIcon,
} from '@material-ui/icons';
import ButtonBar from '../components/ButtonBar/ButtonBar';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import useAsyncEffect from '../hooks/useAsyncEffect';
import useSelector from '../hooks/useSelector';
import useFetchResourceData from '../hooks/useFetchResourceData';
import axios from 'axios';

const ResourcePanel = () => {
    const {
        dogs,
        people,
        peopleTasks,
        dogTasks
    } = useSelector(s => s.tasksStore);

    const fetchResourceData = useFetchResourceData()

    const [resourceType, setResourceType] = useState<
        'people' | 'dogs' | 'peopleTasks' | 'dogTasks'
    >('dogs');

    const [addResourceModalOpem, setAddResourceModalOpem] = useState(false);
    const [newResourceValue, setNewResourceValue] = useState('');

    const getLabel = () => {
        switch (resourceType) {
            case 'dogs':
                return { button: 'psa', panel: 'psami' };
            case 'dogTasks':
                return { button: 'zadanie psa', panel: 'zadaniami psów' };
            case 'people':
                return { button: 'osobę', panel: 'ludźmi' };
            case 'peopleTasks':
                return { button: 'zadanie osoby', panel: 'zadaniami osób' };
        }
    };

    const getResource = () => {
        switch (resourceType) {
            case 'dogs':
                return dogs;
            case 'dogTasks':
                return dogTasks;
            case 'people':
                return people;
            case 'peopleTasks':
                return peopleTasks;
        }
    };

    const getAddRoute = () => {
        switch (resourceType) {
            case 'peopleTasks':
                return apiRoutes.POST.addPersonTask;
            case 'people':
                return apiRoutes.POST.addPerson;
            case 'dogTasks':
                return apiRoutes.POST.addDogTask;
            case 'dogs':
                return apiRoutes.POST.addDog;
        }
    };

    const addResource = async () => {
        await axios.post(getAddRoute(),  {
            name: newResourceValue,
        });

        await fetchResourceData()
        setNewResourceValue('');
        setAddResourceModalOpem(false);
    };

    // TODO: setSaving indicator

    const getDeleteRoute = (id: string) => {
        switch (resourceType) {
            case 'peopleTasks':
                return apiRoutes.DELETE.deletePersonTask(id);
            case 'people':
                return apiRoutes.DELETE.deletePerson(id);
            case 'dogTasks':
                return apiRoutes.DELETE.deleteDogTask(id);
            case 'dogs':
                return apiRoutes.DELETE.deleteDog(id);
        }
    };

    const deleteResource = async (id: string) => {
        await axios.delete(getDeleteRoute(id));

        await fetchResourceData()
    };

    useAsyncEffect(async () => {
        await fetchResourceData()
    }, []);

    return (
        <div>
            <Modal
                open={addResourceModalOpem}
                onClose={() => setAddResourceModalOpem(false)}
                aria-labelledby={`Dodaj ${getLabel().button}`}
            >
                <Card className={classNames(styles.wrapper, styles.form)}>
                    <TextField
                        variant="outlined"
                        label="Nazwa"
                        onChange={(e) => setNewResourceValue(e.target.value)}
                        value={newResourceValue}
                    />

                    <Button onClick={async () => addResource()}>Dodaj</Button>
                </Card>
            </Modal>

            <ButtonBar />
            <Card className={styles.wrapper}>
                <h1>Zarządzanie {getLabel().panel}</h1>

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setAddResourceModalOpem(true)}
                >
                    Dodaj {getLabel().button}
                </Button>

                <List component="nav">
                    <ListItem button onClick={() => setResourceType('dogs')}>
                        <ListItemIcon>
                            <Pets />
                        </ListItemIcon>
                        <ListItemText primary="Psy" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => setResourceType('dogTasks')}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Zadania psów" />
                    </ListItem>

                    <ListItem button onClick={() => setResourceType('people')}>
                        <ListItemIcon>
                            <GroupAdd />
                        </ListItemIcon>
                        <ListItemText primary="Ludzie" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => setResourceType('peopleTasks')}
                    >
                        <ListItemIcon>
                            <DirectionsRun />
                        </ListItemIcon>
                        <ListItemText primary="Zadania ludzi" />
                    </ListItem>
                </List>
                <Divider />

                {resourceType !== 'people' && (
                    <List>
                        {getResource().map((resource) => (
                            <ListItem component="li" key={resource.id}>
                                <ListItemText primary={resource.name} />{' '}
                                <IconButton
                                    onClick={async () =>
                                        deleteResource(resource.id)
                                    }
                                >
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                {resourceType === 'people' && (
                    <List>
                        {getResource().map((resource) => (
                            <ListItem component="li" key={resource.id}>
                                <div>
                                    <ListItemText primary={resource.name} />{' '}
                                    <IconButton
                                        onClick={async () =>
                                            deleteResource(resource.id)
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </div>

                                <div>
                                    {/*// FIXME:update - everything update*/}
                                    {/*// FIXME: select to select dog. Button to add next dog. Button to remove dog*/}
                                </div>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Card>
        </div>
    );
};

export default ResourcePanel;
