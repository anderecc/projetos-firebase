import React from 'react';
import styles from '../styles/container.module.sass';

const Container = (props) => {
    return (
        <main
            className={`${styles.content} ${
                props.auth
                    ? styles.auth
                    : props.register
                    ? styles.register
                    : props.home
                    ? styles.home
                    : ''
            }`}
        >
            {props.children}
        </main>
    );
};

export default Container;
