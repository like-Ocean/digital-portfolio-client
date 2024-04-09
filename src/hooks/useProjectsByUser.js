import { useEffect, useState } from 'react';
import { getUserProjectsApi } from '../api/users/get-user-projects.js';

export const useProjectsByUser = (userId) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            try {
                const res = await getUserProjectsApi(userId);
                setProjects(res.data);
            } catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        fetch().then();
    }, [userId]);

    return [projects, loading, error];
};
