import React from 'react';
// import styles from './DogTraining.module.scss';
import DogTrainingList from '../../components/DogTrainingList/DogTrainingList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DogTraining } from '../../types/Dog';
import TrainingService from '../../services/TrainingService';
import { httpMethods, http } from '../../helpers/http';
import { apiRoutes } from '../../consts/apiRoutes';

interface Props {}

interface State {
    dogTrainingList: DogTraining[];
}

class DogTrainingWrapper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dogTrainingList: []
        };
    }

    componentDidMount() {
        http(apiRoutes.GET.trainingDogs).then(
            (dogTrainingList: DogTraining[]) => {
                this.setState({
                    dogTrainingList
                });
            }
        );
    }

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

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <DogTrainingList dogTrainingList={this.state.dogTrainingList} />
            </DragDropContext>
        );
    }
}

export default DogTrainingWrapper;
