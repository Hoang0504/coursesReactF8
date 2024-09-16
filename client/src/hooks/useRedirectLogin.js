import { useContext } from 'react';
import { Context } from '~/components/Context';

const useRedirectLogin = () => {
    const { setIsLoggedIn, setUserLoggedIn, setToken } = useContext(Context);

    const handleError = (err) => {
        if (err.status === 401 || err.status === 403) {
            alert('Invalid login session. Please login again!');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userLoggedIn');
            setIsLoggedIn(false);
            setUserLoggedIn({});
            setToken('');
        } else {
            console.error(err);
        }
    };

    return handleError;
};

export default useRedirectLogin;
