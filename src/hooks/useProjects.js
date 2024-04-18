import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { projectActions } from '../store/reducers/project-slice.js';
import { getProjects } from '../api/projects/get-projects.js';

export const useProjects = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            try {
                const res = await getProjects();
                dispatch(projectActions.setProjects(res.data));
            } catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        fetch().then();
    }, [dispatch]);

    return [projects, loading, error];
};
