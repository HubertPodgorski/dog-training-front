import React, { ReactNode } from 'react';
import styles from './Section.module.scss';
import classNames from 'classnames';

interface Props {
    children: ReactNode;
    name?: string;
    spacingTop?: boolean;
}

const Section = ({ children, name, spacingTop }: Props) => {
    return (
        <div
            className={classNames(styles.sectionWrapper, {
                [styles.spacingTop]: spacingTop,
            })}
        >
            {name && <div className={styles.name}>{name}</div>}
            {children}
        </div>
    );
};

export default Section;
