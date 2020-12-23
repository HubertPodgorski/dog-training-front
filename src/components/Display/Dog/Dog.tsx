import React from 'react';
import styles from './Dog.module.scss';
import classNames from 'classnames';

interface Props {
    name: string;
    hasTwoColumns: boolean;
}

const Dog = ({ name, hasTwoColumns }: Props) => (
    <div
        className={classNames(styles.wrapper, {
            [styles.hasTwoColumns]: hasTwoColumns,
        })}
    >
        {name}
    </div>
);

export default Dog;
