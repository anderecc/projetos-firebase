import React from 'react';
import styles from '../styles/loading.module.sass';
const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Loading;
