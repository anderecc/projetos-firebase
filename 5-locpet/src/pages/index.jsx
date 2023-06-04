import { useSelector } from 'react-redux';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadApp from '@/components/Head';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

import styles from '../styles/home.module.sass';
import Map from '@/components/map/Map';
import { contextSetMap } from '@/store/actions/contextActions';
import Clients from '@/components/clients/Clients';
import { useState } from 'react';

export default function Home() {
    const context = useSelector((state) => state.context);
    const clients = useSelector((state) => state.clients);
    const [search, setSearch] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [resSearch, setResSearch] = useState({ data: [] });

    const handleChange = (e) => {
        if (e.target.value.trim()) {
            setValueSearch(e.target.value);
        } else {
            setValueSearch('');
            setSearch(false);
        }
    };

    const handleSubmit = async () => {
        const response = [];
        const data = clients.data;
        await data.forEach((client) => {
            if (
                client.nameClient
                    .toLowerCase()
                    .includes(valueSearch.toLowerCase()) ||
                client.namePet.toLowerCase().includes(valueSearch.toLowerCase())
            ) {
                response.push(client);
            }
        });
        setResSearch({ data: [...response] });
        setSearch(true);
    };

    const handleClear = () => {
        setSearch(false);
        setValueSearch('');
    };

    return (
        <>
            <HeadApp title="Inicio" />
            <Header />
            {context.loading ? (
                <Container>
                    <Loading />
                </Container>
            ) : (
                <Container home>
                    <section className={styles.search_container}>
                        <label htmlFor="searchClient">
                            Procurar por Cliente ou Animal:
                        </label>
                        <input
                            type="text"
                            id="searchClient"
                            value={valueSearch}
                            onChange={handleChange}
                        />
                        <div>
                            <button
                                onClick={handleSubmit}
                                className={styles.btn_search}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <button
                                onClick={handleClear}
                                className={styles.btn_clear}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </section>
                    <section>
                        {search ? (
                            <ul>
                                <Clients clients={resSearch} />
                            </ul>
                        ) : (
                            <ul>
                                <Clients clients={clients} />
                            </ul>
                        )}
                    </section>
                    {context.mapVisible ? (
                        <Map setMapVisible={contextSetMap} />
                    ) : (
                        false
                    )}
                </Container>
            )}
            <Footer />
        </>
    );
}
