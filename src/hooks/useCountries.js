import { useAreas } from './useAreas.js';
import { useMemo } from 'react';

export const useCountries = () => {
    const [areas] = useAreas();
    const countries = useMemo(() => {
        return areas.map((area) => area.name);
    }, [areas]);

    return countries;
};
