import { useEffect } from 'react';

export const useResetCity = (setValue, country) => {
    useEffect(() => {
        setValue('city', null);
    }, [setValue, country]);
};
