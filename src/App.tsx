import React from 'react';
import styles from './App.module.scss';
import '@atlaskit/css-reset';
import useAsyncEffect from './hooks/useAsyncEffect';
import Router from './Router';
import useFetchResourceData from './hooks/useFetchResourceData';
import useFetchTaskList from './hooks/useFetchTaskList';


const App = () => {
    const fetchTaskList = useFetchTaskList();
    const fetchResourceData = useFetchResourceData();

    useAsyncEffect(async () => {
        await fetchTaskList();
        await fetchResourceData();
    }, []);

    return (
            <section className={styles.wrapper}>
                <Router />
            </section>
    );
};

export default App;
