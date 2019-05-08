import React from 'react';
import styles from './App.module.scss';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import '@atlaskit/css-reset';
import DogTrainingWrapper from './wrappers/DogTrainingWrapper/DogTrainingWrapper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FaHandPaper, FaPen, FaLock } from 'react-icons/fa';
import { GiJumpingDog, GiStrong } from 'react-icons/gi';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

interface Props {}

interface State {
    isDndLocked: boolean;
    isMenuOpen: boolean;
    isPeopleTasksEditingLocked: boolean;
    isDogTasksEditingLocked: boolean;
    isTaskDescriptionEditingLocked: boolean;
    isDisablingLocked: boolean;
    anchorEl: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
}

const menuIconsTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: red
    }
});

const getColorBasedOnLockStaus = (isLocked: boolean): 'secondary' | 'primary' =>
    isLocked ? 'secondary' : 'primary';

export const DogTrainingContext = React.createContext({
    isDndLocked: true,
    isPeopleTasksEditingLocked: true,
    isDogTasksEditingLocked: true,
    isTaskDescriptionEditingLocked: true,
    isDisablingLocked: true
});

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isDndLocked: true,
            isPeopleTasksEditingLocked: true,
            isMenuOpen: false,
            anchorEl: null,
            isDogTasksEditingLocked: true,
            isTaskDescriptionEditingLocked: true,
            isDisablingLocked: true
        };
    }

    onDndToggle = (): void => {
        this.setState((state: State) => ({
            isDndLocked: !this.state.isDndLocked
        }));
    };

    onMenuToggle = (e: any): void => {
        const menuTarget = e.currentTarget;

        this.setState((state: State) => ({
            isMenuOpen: !state.isMenuOpen,
            anchorEl: menuTarget
        }));
    };

    onPeopleTasksToggle = (): void => {
        this.setState((state: State) => ({
            isPeopleTasksEditingLocked: !state.isPeopleTasksEditingLocked
        }));
    };

    onDogTasksToggle = (): void => {
        this.setState((state: State) => ({
            isDogTasksEditingLocked: !state.isDogTasksEditingLocked
        }));
    };

    onTaskDescriptionToggle = (): void => {
        this.setState((state: State) => ({
            isTaskDescriptionEditingLocked: !state.isTaskDescriptionEditingLocked
        }));
    };

    onDisablingToggle = (): void => {
        this.setState((state: State) => ({
            isDisablingLocked: !state.isDisablingLocked
        }));
    };

    render() {
        return (
            <DogTrainingContext.Provider value={this.state}>
                <section className={styles['app-wrapper']}>
                    <Fab
                        color={getColorBasedOnLockStaus(this.state.isDndLocked)}
                        aria-label="lock-unlock"
                        onClick={this.onMenuToggle}
                        className={styles['app-wrapper__lock-icon']}
                    >
                        <Icon>
                            <MoreVertIcon />
                        </Icon>
                    </Fab>

                    <Menu
                        open={this.state.isMenuOpen}
                        onClose={this.onMenuToggle}
                        className={styles['app-wrapper__menu']}
                        anchorEl={this.state.anchorEl}
                        disableAutoFocusItem
                    >
                        <MenuItem onClick={this.onMenuToggle}>
                            <MuiThemeProvider theme={menuIconsTheme}>
                                <IconButton
                                    onClick={this.onDndToggle}
                                    color={getColorBasedOnLockStaus(
                                        this.state.isDndLocked
                                    )}
                                >
                                    <Icon>
                                        <FaHandPaper />
                                    </Icon>
                                </IconButton>
                            </MuiThemeProvider>
                        </MenuItem>

                        <MenuItem onClick={this.onMenuToggle}>
                            <MuiThemeProvider theme={menuIconsTheme}>
                                <IconButton
                                    onClick={this.onDogTasksToggle}
                                    color={getColorBasedOnLockStaus(
                                        this.state.isDogTasksEditingLocked
                                    )}
                                >
                                    <Icon>
                                        <GiJumpingDog />
                                    </Icon>
                                </IconButton>
                            </MuiThemeProvider>
                        </MenuItem>

                        <MenuItem onClick={this.onMenuToggle}>
                            <MuiThemeProvider theme={menuIconsTheme}>
                                <IconButton
                                    onClick={this.onPeopleTasksToggle}
                                    color={getColorBasedOnLockStaus(
                                        this.state.isPeopleTasksEditingLocked
                                    )}
                                >
                                    <Icon>
                                        <GiStrong />
                                    </Icon>
                                </IconButton>
                            </MuiThemeProvider>
                        </MenuItem>

                        <MenuItem onClick={this.onMenuToggle}>
                            <MuiThemeProvider theme={menuIconsTheme}>
                                <IconButton
                                    onClick={this.onTaskDescriptionToggle}
                                    color={getColorBasedOnLockStaus(
                                        this.state
                                            .isTaskDescriptionEditingLocked
                                    )}
                                >
                                    <Icon>
                                        <FaPen />
                                    </Icon>
                                </IconButton>
                            </MuiThemeProvider>
                        </MenuItem>

                        <MenuItem onClick={this.onMenuToggle}>
                            <MuiThemeProvider theme={menuIconsTheme}>
                                <IconButton
                                    onClick={this.onDisablingToggle}
                                    color={getColorBasedOnLockStaus(
                                        this.state.isDisablingLocked
                                    )}
                                >
                                    <Icon>
                                        <FaLock />
                                    </Icon>
                                </IconButton>
                            </MuiThemeProvider>
                        </MenuItem>
                    </Menu>

                    <DogTrainingWrapper />
                </section>
            </DogTrainingContext.Provider>
        );
    }
}

export default App;
