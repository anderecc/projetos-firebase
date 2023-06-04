import { AUTH_RESET_USER, AUTH_SET_TOKEN, AUTH_SET_USER } from '../types';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/connectFirebase';
import {
    messagesSetErrorLogin,
    messagesSetErrorRegister,
} from './messagesActions';
import { contextSetLoading } from './contextActions';

export const authSetUser = (user) => (dispatch) =>
    dispatch({ type: AUTH_SET_USER, payload: user });

export const authSetToken = (token) => (dispatch) =>
    dispatch({ type: AUTH_SET_TOKEN, payload: token });

export const authResetUser = () => (dispatch) =>
    dispatch({ type: AUTH_RESET_USER });

export const authLogin = (user) => (dispatch) => {
    dispatch(contextSetLoading(true));
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            await dispatch(
                authSetUser({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                })
            );

            dispatch(contextSetLoading(false));
            window.location.reload();
        })
        .catch(() => {
            dispatch(contextSetLoading(false));
            dispatch(messagesSetErrorLogin('E-mail ou senha está incorreto.'));
        });
};

export const authRegister = (user) => (dispatch) => {
    dispatch(contextSetLoading(true));
    const { name, email, password } = user;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await updateProfile(auth.currentUser, { displayName: name }).catch(
                () =>
                    dispatch(
                        messagesSetErrorRegister(
                            'Ocorreu algum erro ao tentar setar seu nome.'
                        )
                    )
            );
            await dispatch(
                authSetUser({
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                })
            );
            dispatch(contextSetLoading(false));
            window.location.reload();
        })
        .catch((error) => {
            dispatch(contextSetLoading(false));
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                return dispatch(
                    messagesSetErrorRegister(
                        'Já existe um usuário com esse email cadastrado.'
                    )
                );
            }
            dispatch(
                messagesSetErrorRegister(
                    'Ocorreu algum erro ao tentar registrar ou conectar com a base da dados.'
                )
            );
        });
};

export const authSignOut = (deleteCookie) => async (dispatch) => {
    dispatch(contextSetLoading(true));
    signOut(auth)
        .then(async () => {
            await deleteCookie('user_token');
            await deleteCookie('user_uid');
            await dispatch(authResetUser());
            dispatch(contextSetLoading(false));
            window.location.reload();
        })
        .catch(() => {
            dispatch(contextSetLoading(false));
        });
};
