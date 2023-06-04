import React, { useEffect, useState } from 'react';
import styles from '../../styles/cadastrar/form.module.sass';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    clientsAddClient,
    clientsUpdateClient,
} from '@/store/actions/clientsActions';
import { useRouter } from 'next/router';
import { mapSetAddress } from '@/store/actions/mapActions';

const Form = (props) => {
    const map = useSelector((state) => state.map);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [values, setValues] = useState({
        nameClient: '',
        namePet: '',
        phone: '',
        complement: '',
        reference: '',
    });

    const [errors, setErrors] = useState({
        nameClient: '',
        namePet: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (props.client) {
            setValues({
                nameClient: props.client.nameClient,
                namePet: props.client.namePet,
                phone: props.client.phone,
                complement: props.client.complement,
                reference: props.client.reference,
            });
        }
    }, [props.client]);

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value.trim();

        switch (id) {
            case 'nameClient':
                if (value) {
                    setErrors({ ...errors, nameClient: '' });
                    return setValues({ ...values, nameClient: e.target.value });
                } else {
                    setErrors({
                        ...errors,
                        nameClient: 'Preencha o campo "Nome do Cliente"',
                    });
                    return setValues({ ...values, nameClient: '' });
                }
            case 'namePet':
                if (value) {
                    setErrors({ ...errors, namePet: '' });
                    return setValues({ ...values, namePet: e.target.value });
                } else {
                    setErrors({
                        ...errors,
                        namePet: 'Preencha o campo "Nome do Animal"',
                    });
                    return setValues({ ...values, namePet: '' });
                }
            case 'phone':
                if (value) {
                    setErrors({
                        ...errors,
                        phone: '',
                    });
                    return setValues({ ...values, phone: e.target.value });
                } else {
                    setErrors({
                        ...errors,
                        phone: 'Preencha o campo "Telefone"',
                    });
                    return setValues({ ...values, phone: '' });
                }
            case 'address':
                if (value) {
                    setErrors({
                        ...errors,
                        address: '',
                    });
                    return dispatch(mapSetAddress(e.target.value));
                } else {
                    setErrors({
                        ...errors,
                        address: 'Preencha o campo "Endereço"',
                    });
                    return dispatch(mapSetAddress(''));
                }
            case 'complement':
                if (value) {
                    return setValues({ ...values, complement: e.target.value });
                } else {
                    return setValues({ ...values, complement: '' });
                }
            case 'reference':
                if (value) {
                    return setValues({ ...values, reference: e.target.value });
                } else {
                    return setValues({ ...values, reference: '' });
                }

            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.edit) {
            dispatch(
                clientsUpdateClient(
                    props.client.id,
                    {
                        ...values,
                        address: map.address,
                    },
                    push
                )
            );
        } else {
            dispatch(
                clientsAddClient({ ...values, address: map.address }, push)
            );
        }
    };
    return (
        <form
            action="POST"
            onSubmit={handleSubmit}
            className={styles.container}
        >
            <div className={styles.content}>
                <div>
                    <label htmlFor="nameClient">
                        Nome do Cliente (Obrigatório):{' '}
                    </label>
                    <input
                        type="text"
                        id="nameClient"
                        required
                        value={values.nameClient}
                        onChange={handleChange}
                        placeholder="ex: João"
                    />
                    <p className="text-danger">{errors?.nameClient}</p>
                </div>
                <div>
                    <label htmlFor="namePet">
                        Nome do Animal (Obrigatório):{' '}
                    </label>
                    <input
                        type="text"
                        id="namePet"
                        required
                        value={values.namePet}
                        onChange={handleChange}
                        placeholder="ex: Caramelo"
                    />
                    <p className="text-danger">{errors?.namePet}</p>
                </div>
                <div>
                    <label htmlFor="phone">Telefone (Obrigatório): </label>
                    <input
                        type="phone"
                        id="phone"
                        required
                        value={values.phone}
                        onChange={handleChange}
                        placeholder="ex: 54999999999"
                    />
                    <p className="text-danger">{errors?.phone}</p>
                </div>
                <div>
                    <label htmlFor="address">Endereço (Obrigatório): </label>
                    <input
                        type="text"
                        id="address"
                        required
                        value={map.address}
                        onChange={handleChange}
                        placeholder="ex: Rua São Paulo, 85"
                    />
                    <p className="text-danger">{errors?.address}</p>
                </div>
                <div>
                    <label htmlFor="complement">Complemento: </label>
                    <input
                        type="text"
                        id="complement"
                        value={values.complement}
                        onChange={handleChange}
                        placeholder="ex: Apartamento 102, bloco 1"
                    />
                </div>
                <div>
                    <label htmlFor="reference">Referencia: </label>
                    <input
                        type="text"
                        id="reference"
                        value={values.reference}
                        onChange={handleChange}
                        placeholder="ex: Na rua do mercado Bras."
                    />
                </div>
            </div>
            <div className={styles.btns_container}>
                <input
                    type="submit"
                    value={`${props.edit ? 'Salvar' : 'Adicionar'}`}
                    className={styles.btn_submit}
                />
                <Link
                    href="/"
                    className={styles.btn_cancel}
                    onClick={() => dispatch(mapSetAddress(''))}
                >
                    Cancelar
                </Link>
            </div>
        </form>
    );
};

export default Form;
