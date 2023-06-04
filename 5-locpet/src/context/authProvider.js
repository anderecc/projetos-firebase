import { auth } from '@/lib/connectFirebase';
import { authSetToken, authSetUser } from '@/store/actions/authActions';
import { clientsGetData } from '@/store/actions/clientsActions';
import { contextSetLoading } from '@/store/actions/contextActions';
import { setCookie } from 'cookies-next';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contextSetLoading(true));
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                try {
                    dispatch(
                        authSetUser({
                            name: user.displayName,
                            email: user.email,
                            id: user.uid,
                        })
                    );
                    dispatch(authSetToken(token));
                    setCookie('user_token', token);
                    setCookie('user_uid', user.uid);

                    // get data
                    dispatch(clientsGetData(token));
                    dispatch(contextSetLoading(false));
                } catch (error) {
                    dispatch(contextSetLoading(false));
                }
            } else {
                dispatch(contextSetLoading(false));
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ undefined }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
