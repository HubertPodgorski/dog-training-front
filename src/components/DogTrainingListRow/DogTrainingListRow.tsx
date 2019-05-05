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

interface Props {
    dogInTraining: DogTraining;
    index: number;
}

interface State {
    isExpanded: boolean;
    trainingDescription: string;
    isSaving: boolean;
}

const getIconBasedOnExpandState = (
    isExpanded: boolean
): 'expand_less' | 'expand_more' =>
    isExpanded ? 'expand_less' : 'expand_more';

class DogTrainingListRow extends React.Component<Props, State> {
    onDescriptionChange$: Subject<string>;
    subscription: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: false,
            trainingDescription: props.dogInTraining.trainingDescription,
            isSaving: false
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
                                className={styles['dog-training-list-row']}
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

                                    <IconButton onClick={this.toggleIsExpanded}>
                                        <Icon>
                                            {getIconBasedOnExpandState(
                                                this.state.isExpanded
                                            )}
                                        </Icon>
                                    </IconButton>
                                </div>

                                <Collapse in={this.state.isExpanded}>
                                    {dogTrainingContext.isDndLocked && (
                                        <p>
                                            {
                                                this.props.dogInTraining
                                                    .trainingDescription
                                            }
                                        </p>
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
