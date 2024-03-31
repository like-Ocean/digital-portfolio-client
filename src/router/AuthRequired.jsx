import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRequired = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/authorization" />;
};
