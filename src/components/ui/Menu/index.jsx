import { UnstyledButton } from '@mantine/core';
import style from './Menu.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Menu = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const user = useSelector((state) => state.user.user);

    return (
        <>
            <UnstyledButton className={style.control}>
                <Link to="/">Главная</Link>
            </UnstyledButton>

            {isAuth && (
                <UnstyledButton className={style.control}>
                    <Link to={`/profile/${user.id}`}>Профиль</Link>
                </UnstyledButton>
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
