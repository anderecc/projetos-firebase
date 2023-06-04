import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadApp from '@/components/Head';
import Header from '@/components/Header';
import { authLogin } from '@/store/actions/authActions';
import styles from '../../styles/auth/login.module.sass';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';

const Login = () => {
    const messages = useSelector((state) => state.messages);
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { push } = useRouter();

    const [user, setUser] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(authLogin(user));
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
                        <h3>Entrar na sua conta.</h3>
                        <form action="POST" onSubmit={handleSubmit}>
                            <label htmlFor="login_email">Email:</label>
                            <input
                                required
                                type="email"
                                name="login_email"
                                id="login_email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                            <label htmlFor="login_password">Senha:</label>
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
                                name="login_password"
                                id="login_password"
                            />
                            <input
                                className={styles.btn_submit}
                                type="submit"
                                value="Entrar"
                            />
                        </form>
                        <p className="text-danger">{messages.errors.login}</p>
                        <p>
                            Não tem uma conta?{' '}
                            <Link href="/auth/register">Cadastrar</Link> uma
                            agora mesmo.
                        </p>
                    </section>
                </Container>
            )}
            <Footer />
        </>
    );
};

export default Login;
