import Link from 'next/link';
import React from 'react';

import styles from '../styles/footer.module.sass';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <p>
                Copyright &copy;, by:{' '}
                <Link href="https://anderecc.com.br" target="_blank">
                    anderecc
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
