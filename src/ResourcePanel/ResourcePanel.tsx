import React, { useState } from 'react';
import { Button, Card, IconButton, LinearProgress, Modal } from '@material-ui/core';
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
    Event as EventIcon,
    List as ListIcon
} from '@material-ui/icons';
import ButtonBar from '../components/ButtonBar/ButtonBar';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import useAsyncEffect from '../hooks/useAsyncEffect';
import useSelector from '../hooks/useSelector';
import useFetchResourceData from '../hooks/useFetchResourceData';
import axios from 'axios';
import CustomMultiselect from '../Configurator/Dogs/CustomMultiselect/CustomMultiselect';
import useFetchPeople from '../hooks/useFetchPeople';
import { Dog, DogTask, Person, PersonTask, Event } from '../types';

const getName = (resource: Dog | DogTask | Person | PersonTask | Event): string => {
    if ('name' in resource) {
        return resource.name
    }

    if ('taskName' in resource) {
        return resource.taskName
    }

    return ''
}

const ResourcePanel = () => {
    const {
        dogs,
        people,
        peopleTasks,
        dogTasks,
        events
    } = useSelector(s => s.tasksStore);

    const fetchResourceData = useFetchResourceData()
    const fetchPeople = useFetchPeople()

    const [resourceType, setResourceType] = useState<
        'people' | 'dogs' | 'peopleTasks' | 'dogTasks' | 'events'
    >('dogs');

    const [addResourceModalOpem, setAddResourceModalOpem] = useState(false);
    const [newResourceValue, setNewResourceValue] = useState('');
    const [savingDog, setSavingDog] = useState(false)

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
            case 'events':
                return {button: 'wydarzenie', panel: 'wydarzenia'}
        }
    };

    const getResource = (): (Dog | DogTask | Person | PersonTask | Event)[] => {
        switch (resourceType) {
            case 'dogs':
                return dogs;
            case 'dogTasks':
                return dogTasks;
            case 'people':
                return people;
            case 'peopleTasks':
                return peopleTasks;
            case 'events':
                return events;
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
            case 'events':
                return apiRoutes.POST.addEvent;
        }
    };

    const addResource = async () => {
        await axios.post(getAddRoute(),  {
            name: newResourceValue,
        });

        //FIXME:  fetch resource type only changed

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
            case 'events':
                return apiRoutes.DELETE.deleteEvent(id);
        }
    };

    const deleteResource = async (id: string) => {
        await axios.delete(getDeleteRoute(id));

        await fetchResourceData()
    };

    useAsyncEffect(async () => {
        await fetchResourceData()
    }, []);

    const updateDogList = async (dogs: string[], personId: string) => {
        await axios.put(apiRoutes.PUT.updatePerson(personId), {dogs})

        await fetchPeople()
    }

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
                    <ListItem
                        button onClick={() => setResourceType('dogs')}
                        selected={resourceType === 'dogs'}
                    >
                        <ListItemIcon>
                            <Pets />
                        </ListItemIcon>
                        <ListItemText primary="Psy" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => setResourceType('dogTasks')}
                        selected={resourceType === 'dogTasks'}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Zadania psów" />
                    </ListItem>

                    <ListItem
                        button onClick={() => setResourceType('people')}
                        selected={resourceType === 'people'}
                    >
                        <ListItemIcon>
                            <GroupAdd />
                        </ListItemIcon>
                        <ListItemText primary="Ludzie" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => setResourceType('peopleTasks')}
                        selected={resourceType === 'peopleTasks'}
                    >
                        <ListItemIcon>
                            <DirectionsRun />
                        </ListItemIcon>
                        <ListItemText primary="Zadania ludzi" />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => setResourceType('events')}
                        selected={resourceType === 'events'}
                    >
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wydarzenia" />
                    </ListItem>
                </List>
                <Divider />

                {resourceType !== 'people' && (
                    <List>
                        {getResource().map((resource) => (
                            <ListItem component="li" key={resource.id}>
                                <ListItemText primary={getName(resource)} />{' '}
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
                        {savingDog && <LinearProgress />}

                        {(getResource() as Person[]).map((resource) => (
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
                                    <CustomMultiselect
                                        onChange={async (dogIds: string[]) => {
                                            setSavingDog(true)
                                            await updateDogList(dogIds, resource.id)
                                            setSavingDog(false)
                                        }}
                                        options={dogs}
                                        selectLabel="Psy"
                                        selectedValues={resource.dogs.map(({id}) => id)}
                                    />
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
