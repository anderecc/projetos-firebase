import { deleteCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import React from 'react';

import { authSignOut } from '@/store/actions/authActions';
import styles from '../styles/header.module.sass';
import { mapSetAddress } from '@/store/actions/mapActions';

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    return (
        <header className={styles.container}>
            <nav className={styles.content}>
                {auth.user?.email ? (
                    <ul className={styles.user_on}>
                        <li>
                            <Link href="/">Clientes</Link>

                            <Link
                                href="/cadastrar"
                                onClick={() => dispatch(mapSetAddress(''))}
                            >
                                Cadastrar
                            </Link>
                        </li>
                        <li className={styles.user}>
                            <p>{auth.user.name}</p>
                        </li>

                        <li>
                            <button
                                className={styles.btn_logOut}
                                onClick={() =>
                                    dispatch(authSignOut(deleteCookie))
                                }
                            >
                                Sair
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className={styles.user_off}>
                        <li>
                            <Link href="/auth/login">Entrar</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Registrar</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
