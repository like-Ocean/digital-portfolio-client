import style from './FullscreenLoader.module.css';
import { Loader } from '@mantine/core';

export const FullscreenLoader = () => {
    return (
        <div className={style.loader}>
            <Loader />
        </div>
    );
};
