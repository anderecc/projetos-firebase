import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadApp from '@/components/Head';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Form from '@/components/cadastrar/Form';
import AddressInMap from '@/components/map/AddressInMap';
import { clientsGetClient } from '@/store/actions/clientsActions';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/editar/editar.module.sass';
import { useRouter } from 'next/router';

const Editar = () => {
    const router = useRouter();
    const auth = useSelector((state) => state.auth);
    const context = useSelector((state) => state.context);
    const dispatch = useDispatch();
    const [client, setClient] = useState({
        nameClient: '',
        namePet: '',
        phone: '',
        complement: '',
        reference: '',
    });

    useEffect(() => {
        dispatch(clientsGetClient(router.query.id, setClient));
    }, [auth.token]);

    return (
        <>
            <HeadApp />
            <Header />
            {context.loading ? (
                <Container>
                    <Loading />
                </Container>
            ) : (
                <Container register>
                    <section className={styles.title_container}>
                        <h3>Editar cliente</h3>
                        <p>Lembre de preencher os campos corretamente</p>
                    </section>
                    <section>
                        <Form edit client={client ? client : {}} />
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

export default Editar;
