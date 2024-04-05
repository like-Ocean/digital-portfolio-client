import { UnstyledButton } from '@mantine/core';
import style from './Menu.module.css';
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <>
            <UnstyledButton className={style.control}>
                <Link to="/">Главная</Link>
            </UnstyledButton>

            <UnstyledButton className={style.control}>
                <Link to="/profile">Профиль</Link>
            </UnstyledButton>
        </>
    );
};
