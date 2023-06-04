import React from 'react';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadApp from '@/components/Head';
import Header from '@/components/Header';
import Form from '@/components/cadastrar/Form';

import styles from '../styles/cadastrar/cadastrar.module.sass';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import AddressInMap from '@/components/map/AddressInMap';

const Cadastrar = () => {
    const context = useSelector((state) => state.context);

    return (
        <>
            <HeadApp title="Cadastrar" />
            <Header />
            {context.loading ? (
                <Container>
                    <Loading />
                </Container>
            ) : (
                <Container register>
                    <section className={styles.title_container}>
                        <h3>Adicionar novo cliente para buscas/entregas</h3>
                        <p>Lembre de preencher os campos corretamente</p>
                    </section>
                    <section className={styles.form_container}>
                        <Form />
                    </section>
                    <section className={styles.map_container}>
                        <AddressInMap />
                    </section>
                </Container>
            )}
            <Footer />
        </>
    );
};

export default Cadastrar;
