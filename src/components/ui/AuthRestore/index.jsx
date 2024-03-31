import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../../api/users/check-auth.js';
import { userActions } from '../../../store/reducers/user-slice.js';
import { FullscreenLoader } from '../FullscreenLoader/index.jsx';
import PropTypes from 'prop-types';

export const AuthRestore = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        checkAuth()
            .then((res) => {
                dispatch(userActions.login(res.data));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);

    return loading ? <FullscreenLoader/> : children;
};

AuthRestore.propTypes = {
    children: PropTypes.node,
};
