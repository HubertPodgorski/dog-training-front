import React, { ReactNode } from 'react';
import styles from './Section.module.scss';

interface Props {
    children: ReactNode;
    name?: string;
    spacingTop?: boolean;
}

const Section = ({ children, name, spacingTop }: Props) => {
    return (
        <div
            className={`${styles.sectionWrapper} ${
                spacingTop ? styles.spacingTop : ''
            }`}
        >
            {name && <div className={styles.name}>{name}</div>}
            {children}
        </div>
    );
};

export default Section;
