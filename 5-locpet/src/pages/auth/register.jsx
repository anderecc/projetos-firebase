import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadApp from '@/components/Head';
import Header from '@/components/Header';
import { authRegister } from '@/store/actions/authActions';
import styles from '../../styles/auth/register.module.sass';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';

const Register = () => {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);

    const { push } = useRouter();

    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(authRegister(user));
    };

    useEffect(() => {
        if (auth.token) {
            push('/');
        }
    }, [auth.token]);

    return (
        <>
            <HeadApp title="Entre na sua conta ou faça um cadastro." />
            <Header />
            {context.loading ? (
                <Container>
                    <Loading />
                </Container>
            ) : (
                <Container auth>
                    <section className={styles.container}>
                        <h3>Cadastre uma conta.</h3>
                        <form action="POST" onSubmit={handleSubmit}>
                            <label htmlFor="register_name">Nome:</label>
                            <input
                                required
                                type="text"
                                name="register_name"
                                id="register_name"
                                value={user.name}
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                            />
                            <label htmlFor="register_email">Email:</label>
                            <input
                                required
                                type="email"
                                name="register_email"
                                id="register_email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                            <label htmlFor="register_password">Senha:</label>
                            <input
                                required
                                value={user.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                type="password"
                                name="register_password"
                                id="register_password"
                            />
                            <input
                                type="submit"
                                value="Registrar"
                                className={styles.btn_submit}
                            />
                        </form>
                        <p>
                            Já tem uma conta?{' '}
                            <Link href="/auth/login">Entrar </Link>
                            nela agora mesmo.
                        </p>
                    </section>
                </Container>
            )}
            <Footer />
        </>
    );
};

export default Register;
