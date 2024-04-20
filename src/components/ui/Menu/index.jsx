import { UnstyledButton } from '@mantine/core';
import style from './Menu.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/reducers/user-slice.js';
import { logoutApi } from '../../../api/users/logout.js';

export const Menu = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            await logoutApi();
            dispatch(userActions.logout());
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <UnstyledButton className={style.control}>
                <Link to="/">Главная</Link>
            </UnstyledButton>

            {isAuth && (
                <>
                    <UnstyledButton className={style.control}>
                        <Link to={`/profile/${user.id}`}>Профиль</Link>
                    </UnstyledButton>

                    <UnstyledButton
                        onClick={onLogout}
                        className={`${style.control} ${style.logout}`}
                    >
                        <Link to={`/`}>Выход</Link>
                    </UnstyledButton>
                </>
            )}

            {!isAuth && (
                <>
                    <UnstyledButton className={style.control}>
                        <Link to="/authorization">Вход</Link>
                    </UnstyledButton>

                    <UnstyledButton className={style.control}>
                        <Link to="/registration">Регистрация</Link>
                    </UnstyledButton>
                </>
            )}
        </>
    );
};
