import React from 'react';
import styles from './Dog.module.scss';

interface Props {
    name: string;
}

const Dog = ({ name }: Props) => <div className={styles.wrapper}>{name}</div>;

export default Dog;
