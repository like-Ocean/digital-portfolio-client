import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCommentsByProjectIdApi } from '../api/comments/get-comments-by-project-id.js';
import { commentActions } from '../store/reducers/comment-slice.js';

export const useCommentsByProjectId = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getCommentsByProjectIdApi(id);
                dispatch(commentActions.setComments(res.data));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetch();
    }, [id, dispatch]);

    return { loading, error };
};
