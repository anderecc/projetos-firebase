/* eslint-disable no-unused-vars */
import axios from 'axios';
import { contextSetLoading } from './contextActions';
import { CLIENTS_GET_DATA } from '../types';
import { mapSetAddress } from './mapActions';

export const clientsGetData = (token) => (dispatch) => {
    dispatch(contextSetLoading(true));
    axios
        .get('/api/clients/getClients', { headers: { authenticate: token } })
        .then(async (res) => {
            const clients = [...res.data.clients];

            clients ? clients : [];

            clients.sort((a, b) => {
                if (+a.id - +b.id) return -1;
                if (+a.id + +b.id) return 1;
                return 0;
            });

            dispatch({ type: CLIENTS_GET_DATA, payload: clients });
            dispatch(contextSetLoading(false));
        })
        .catch((error) => {
            dispatch(contextSetLoading(false));
        });
};

export const clientsAddClient = (values, push) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();
    axios
        .post(
            '/api/clients/addClient',
            { ...values },
            { headers: { authenticate: state.auth.token } }
        )
        .then(async () => {
            await dispatch(clientsGetData(state.auth.token));
            await dispatch(mapSetAddress(''));
            push('/');
            dispatch(contextSetLoading(false));
        })
        .catch((error) => {
            dispatch(contextSetLoading(false));
        });
};

export const clientsGetClient =
    (id, setClient) => async (dispatch, getState) => {
        dispatch(contextSetLoading(true));
        const state = getState();
        axios
            .get(`/api/clients/getClient/${id}`, {
                headers: { authenticate: state.auth.token },
            })
            .then((res) => {
                const { client } = res.data;
                dispatch(contextSetLoading(false));
                dispatch(mapSetAddress(client.address));
                setClient({ ...client });
            })
            .catch((error) => {
                dispatch(contextSetLoading(false));
            });
    };

export const clientsDeleteClient = (id) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();
    axios
        .delete(`/api/clients/deleteClient/${id}`, {
            headers: { authenticate: state.auth.token },
        })
        .then((res) => {
            dispatch(clientsGetData(state.auth.token));
            dispatch(contextSetLoading(false));
        })
        .catch((error) => {
            dispatch(contextSetLoading(false));
        });
};

export const clientsUpdateClient =
    (id, values, push) => (dispatch, getState) => {
        dispatch(contextSetLoading(true));
        const state = getState();
        axios
            .put(
                `/api/clients/updateClient/${id}`,
                { ...values },
                { headers: { authenticate: state.auth.token } }
            )
            .then((res) => {
                dispatch(clientsGetData(state.auth.token));
                dispatch(mapSetAddress(''));
                push('/');
                dispatch(contextSetLoading(false));
            })
            .catch((error) => {
                dispatch(contextSetLoading(false));
            });
    };
