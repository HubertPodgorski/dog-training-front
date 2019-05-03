import React from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import DogTrainingWrapper from './wrappers/DogTrainingWrapper/DogTrainingWrapper';

interface Props {}

interface State {
    isDndLocked: boolean;
}

const getColorBasedOnLockStaus = (isLocked: boolean): 'primary' | 'secondary' =>
    isLocked ? 'secondary' : 'primary';

const getIconBasedOnLockStatus = (isLocked: boolean): 'lock' | 'lock_open' =>
    isLocked ? 'lock' : 'lock_open';

export const DogTrainingContext = React.createContext({ isDndLocked: true });

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isDndLocked: true
        };
    }

    onLockToggle = (): void => {
        this.setState({
            isDndLocked: !this.state.isDndLocked
        });
    };

    render() {
        return (
            <DogTrainingContext.Provider value={this.state}>
                <section className={styles['app-wrapper']}>
                    <Fab
                        color={getColorBasedOnLockStaus(this.state.isDndLocked)}
                        aria-label="lock-unlock"
                        onClick={this.onLockToggle}
                        className={styles['app-wrapper__lock-icon']}
                    >
                        <Icon>
                            {getIconBasedOnLockStatus(this.state.isDndLocked)}
                        </Icon>
                    </Fab>
                    <DogTrainingWrapper />
                </section>
            </DogTrainingContext.Provider>
        );
    }
}

export default App;
