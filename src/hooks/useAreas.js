import { useEffect, useState } from 'react';
import { getAreas } from '../api/cities/get-areas.js';

export const useAreas = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAreas = async () => {
            const response = await getAreas();
            setAreas(response.data);
        };

        setLoading(true);
        void fetchAreas().finally(() => setLoading(false));
    }, []);

    return [areas, loading];
};
