import React, { Fragment } from 'react';
import styles from './DogTrainingWrapper.module.scss';
import DogTrainingList from '../../components/DogTrainingList/DogTrainingList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { DogTraining } from '../../types/Dog';
import TrainingService from '../../services/TrainingService';
import { httpMethods, http } from '../../helpers/http';
import { apiRoutes } from '../../consts/apiRoutes';

interface Props {}

interface State {
    dogTrainingList: DogTraining[];
    isDogDataFetching: boolean;
}

class DogTrainingWrapper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dogTrainingList: [],
            isDogDataFetching: false
        };
    }

    componentDidMount() {
        this.fetchDogData();
    }

    fetchDogData = (): void => {
        this.setState({ isDogDataFetching: true });
        http(apiRoutes.GET.trainingDogs).then(
            (dogTrainingList: DogTraining[]) => {
                this.setState({
                    dogTrainingList,
                    isDogDataFetching: false
                });
            }
        );
    };

    onDragEnd = (result: DropResult): void => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedTrainigList = TrainingService.getUpdatedList(
            this.state.dogTrainingList,
            draggableId,
            source.index,
            destination.index
        );

        this.setState(
            {
                dogTrainingList: updatedTrainigList
            },
            () => {
                http(
                    apiRoutes.PUT.changeOrder,
                    httpMethods.PUT,
                    TrainingService.getListOfIdsInUpdatedOrder(
                        this.state.dogTrainingList
                    )
                );
            }
        );
    };

    getClassNameBasedOnFetchingStatus = (): string => {
        const baseClass = 'dog-training-wrapper__refresh-icon';
        return this.state.isDogDataFetching
            ? styles[`${baseClass}--rotating`]
            : styles[baseClass];
    };

    render() {
        return (
            <Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DogTrainingList
                        dogTrainingList={this.state.dogTrainingList}
                    />
                </DragDropContext>

                <Fab
                    color="primary"
                    aria-label="refresh"
                    onClick={this.fetchDogData}
                    className={this.getClassNameBasedOnFetchingStatus()}
                >
                    <Icon>autorenew</Icon>
                </Fab>
            </Fragment>
        );
    }
}

export default DogTrainingWrapper;
