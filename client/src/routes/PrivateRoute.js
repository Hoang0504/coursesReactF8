import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from '~/components/Context';
import config from '~/configs';

function PrivateRoute() {
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(config.routes.login); // Redirect to login if not logged in
        }
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet /> : null;
}

export default PrivateRoute;
