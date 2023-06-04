import { mapGetPosition } from '@/store/actions/mapActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../styles/clients/clients.module.sass';
import { clientsDeleteClient } from '@/store/actions/clientsActions';
import Link from 'next/link';
import regexPhone from '@/functions/regexPhone';

const Clients = ({ clients }) => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState('');

    const handleConfirm = (id) => {
        setConfirm(id);
        return setTimeout(() => {
            setConfirm('');
        }, 2000);
    };

    return clients.data.map((client, index) => {
        const grayOrWhite = index % 2 === 0;
        return (
            <li
                key={client.id}
                className={`${styles.container} ${
                    grayOrWhite ? styles.bg_white : styles.bg_gray
                }`}
            >
                <div>
                    <p>
                        Nome do Cliente: <strong>{client.nameClient}</strong>
                    </p>
                    <p>
                        Nome do Animal: <strong>{client.namePet}</strong>
                    </p>
                </div>
                <div>
                    <p>
                        Telefone: <strong>{client.phone}</strong>{' '}
                        <Link
                            className={styles.link_wpp}
                            target="_blank"
                            href={`https://wa.me/55${regexPhone(client.phone)}`}
                        >
                            <i className="fa-brands fa-whatsapp"></i>
                        </Link>
                    </p>
                    <p>
                        Endereço: <strong>{client.address}</strong>{' '}
                        <button
                            className={styles.btn_open_map}
                            onClick={() =>
                                dispatch(mapGetPosition(client.address))
                            }
                            title="Abrir endereço no mapa."
                        >
                            <i className="fa-solid fa-magnifying-glass-location"></i>
                        </button>
                    </p>
                </div>
                <p>
                    Complemento: <strong>{client.complement}</strong>
                </p>
                <p>
                    Referencia: <strong>{client.reference}</strong>
                </p>
                <div className={styles.actions_container}>
                    <Link
                        href={{ pathname: '/editar', query: { id: client.id } }}
                        className={styles.btn_edit}
                    >
                        Editar
                    </Link>
                    <button
                        onClick={() => handleConfirm(client.id)}
                        className={styles.btn_delete}
                    >
                        Excluir
                    </button>
                    {confirm === client.id ? (
                        <button
                            className={styles.btn_confirm_delete}
                            onClick={() =>
                                dispatch(clientsDeleteClient(client.id))
                            }
                        >
                            Confirmar exclusão
                        </button>
                    ) : (
                        false
                    )}
                </div>
            </li>
        );
    });
};

export default Clients;
