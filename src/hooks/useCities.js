import { useMemo } from 'react';
import { useAreas } from './useAreas.js';

export const useCities = (country) => {
    const [areas] = useAreas();
    const cities = useMemo(() => {
        if (!country) return [];

        const regions = areas.find((area) => area.name === country).areas;
        const cities = [];

        regions.forEach((region) => {
            if (region.areas.length === 0) {
                cities.push(region.name);
            } else {
                region.areas.forEach((city) => {
                    cities.push(city.name);
                });
            }
        });

        return [...new Set(cities)].sort();
    }, [areas, country]);

    return cities;
};
