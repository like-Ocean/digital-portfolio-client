import { UnstyledButton } from '@mantine/core';
import style from './Menu.module.css';

export const Menu = () => {
    return (
        <>
            <UnstyledButton className={style.control}>Главная</UnstyledButton>
            <UnstyledButton className={style.control}>Профиль</UnstyledButton>
        </>
    );
};
