import { useEffect, useState } from 'react';
import { getUserByIdApi } from '../api/users/get-user-by-id.js';

export const useUserById = (userId) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            try {
                const res = await getUserByIdApi(userId);
                setUser(res.data);
            } catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        fetch().then();
    }, [userId]);

    return [user, loading, error];
};
