import { useEffect, useState } from 'react';
import { getUserProjectsApi } from '../api/users/get-user-projects.js';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../store/reducers/project-slice.js';

export const useProjectsByUser = (userId) => {
    const dispatch = useDispatch();

    const projects = useSelector((state) => state.projects.projects);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            try {
                const res = await getUserProjectsApi(userId);
                dispatch(projectActions.setProjects(res.data));
            } catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        fetch().then();
    }, [userId, dispatch]);

    return [projects, loading, error];
};
