import React from 'react';
import styles from './DogTrainingListRow.module.scss';
import { DogTraining } from '../../types/Dog';
import { Draggable } from 'react-beautiful-dnd';
import { DogTrainingContext } from '../../App';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { FaDog } from 'react-icons/fa';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { apiRoutes } from '../../consts/apiRoutes';
import { httpMethods, http } from '../../helpers/http';
import LinearProgress from '@material-ui/core/LinearProgress';
import PeopleTasks from '../PeopleTasks/PeopleTasks';
import DogTasks from '../DogTasks/DogTasks';
import { TaskPair } from '../../services/TasksService';

interface Props {
    dogInTraining: DogTraining;
    index: number;
}

interface State {
    isExpanded: boolean;
    trainingDescription: string;
    isSaving: boolean;
    dogTasks: string[];
    peopleTasks: TaskPair[];
    isDisabled: boolean;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

const getIconBasedOnisDisabledState = (
    isDisabled: boolean
): 'check' | 'cancel' => (isDisabled ? 'check' : 'cancel');

class DogTrainingListRow extends React.Component<Props, State> {
    onDescriptionChange$: Subject<string>;
    subscription: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: false,
            trainingDescription: props.dogInTraining.trainingDescription,
            isSaving: false,
            dogTasks: props.dogInTraining.dogTasks,
            peopleTasks: props.dogInTraining.peopleTasks,
            isDisabled: props.dogInTraining.isDisabled
        };

        this.onDescriptionChange$ = new Subject();
        this.subscription = this.onDescriptionChange$
            .pipe(debounceTime(250))
            .subscribe(() => {
                this.saveDescription();
            });
    }

    componentWillUnmount() {
        if (this.onDescriptionChange$) {
            this.onDescriptionChange$.unsubscribe();
        }
    }

    onDescriptionChange = (e: any) => {
        const { value } = e.currentTarget;
        this.setState({
            trainingDescription: value
        });
        this.onDescriptionChange$.next(value);
    };

    toggleIsExpanded = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    saveDescription() {
        this.setState(
            {
                isSaving: true
            },
            () => {
                http(
                    apiRoutes.PUT.updateTrainingDescription(
                        this.props.dogInTraining.id
                    ),
                    httpMethods.PUT,
                    {
                        trainingDescription: this.state.trainingDescription
                    }
                ).then(() => {
                    this.setState({ isSaving: false });
                });
            }
        );
    }

    saveDogTasks = (dogTasks: string[]): void => {
        console.log('dogTasks', dogTasks);
        this.setState(
            {
                isSaving: true,
                dogTasks
            },
            () => {
                http(
                    apiRoutes.PUT.updateDogTasks(this.props.dogInTraining.id),
                    httpMethods.PUT,
                    {
                        dogTasks
                    }
                ).then(() => {
                    this.setState({ isSaving: false });
                });
            }
        );
    };

    savePeopleTasks = (peopleTasks: TaskPair[]): void => {
        this.setState(
            {
                isSaving: true,
                peopleTasks
            },
            () => {
                http(
                    apiRoutes.PUT.updatePeopleTasks(
                        this.props.dogInTraining.id
                    ),
                    httpMethods.PUT,
                    {
                        peopleTasks
                    }
                ).then(() => {
                    this.setState({ isSaving: false });
                });
            }
        );
    };

    toggleIsDisabled = (): void => {
        this.setState(
            state => ({
                isSaving: true,
                isDisabled: !state.isDisabled
            }),
            () => {
                http(
                    apiRoutes.PUT.updateDogDisability(
                        this.props.dogInTraining.id
                    ),
                    httpMethods.PUT,
                    {
                        isDisabled: this.state.isDisabled
                    }
                ).then(() => {
                    this.setState({ isSaving: false });
                });
            }
        );
    };

    getClassNameBasedOnDisability(): string {
        const baseClassName = styles['dog-training-list-row'];
        if (this.state.isDisabled) {
            return styles['dog-training-list-row--disabled'];
        }

        return baseClassName;
    }

    render() {
        return (
            <DogTrainingContext.Consumer>
                {dogTrainingContext => (
                    <Draggable
                        index={this.props.index}
                        draggableId={this.props.dogInTraining.id}
                        isDragDisabled={dogTrainingContext.isDndLocked}
                    >
                        {provided => (
                            <li
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                className={this.getClassNameBasedOnDisability()}
                            >
                                {this.state.isSaving && <LinearProgress />}
                                <div
                                    className={
                                        styles['dog-training-list-row__label']
                                    }
                                >
                                    <p>
                                        <span
                                            className={
                                                styles[
                                                    'dog-training-list-row__icon'
                                                ]
                                            }
                                        >
                                            <FaDog size="1em" />
                                        </span>
                                        {this.props.dogInTraining.dogName}
                                    </p>

                                    <div>
                                        {!dogTrainingContext.isDndLocked && (
                                            <IconButton
                                                onClick={this.toggleIsDisabled}
                                                className={
                                                    styles[
                                                        'dog-training-list-row__icon-wrapper'
                                                    ]
                                                }
                                            >
                                                <Icon
                                                    className={
                                                        styles[
                                                            'dog-training-list-row__icon'
                                                        ]
                                                    }
                                                >
                                                    {getIconBasedOnisDisabledState(
                                                        this.state.isDisabled
                                                    )}
                                                </Icon>
                                            </IconButton>
                                        )}

                                        <IconButton
                                            onClick={this.toggleIsExpanded}
                                        >
                                            <Icon>
                                                {getIconBasedOnExpandState(
                                                    this.state.isExpanded
                                                )}
                                            </Icon>
                                        </IconButton>
                                    </div>
                                </div>

                                <Collapse in={this.state.isExpanded}>
                                    {dogTrainingContext.isDndLocked && (
                                        <p>{this.state.trainingDescription}</p>
                                    )}
                                    {!dogTrainingContext.isDndLocked && (
                                        <TextField
                                            variant="outlined"
                                            multiline
                                            onChange={this.onDescriptionChange}
                                            value={
                                                this.state.trainingDescription
                                            }
                                            className={
                                                styles[
                                                    'dog-training-list-row__input'
                                                ]
                                            }
                                        />
                                    )}

                                    <DogTasks
                                        saveDogTasks={this.saveDogTasks}
                                        dogTasks={this.state.dogTasks}
                                    />

                                    <PeopleTasks
                                        savePeopleTasks={this.savePeopleTasks}
                                        peopleTasks={this.state.peopleTasks}
                                    />
                                </Collapse>
                            </li>
                        )}
                    </Draggable>
                )}
            </DogTrainingContext.Consumer>
        );
    }
}

export default DogTrainingListRow;
