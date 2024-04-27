import { LoadingOverlay, Rating } from '@mantine/core';
import { useEffect, useState } from 'react';
import { addRatingApi } from '../../../api/ratings/add-rating.js';
import { ratingActions } from '../../../store/reducers/rating-slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRatingByProjectIdApi } from '../../../api/ratings/get-rating-by-project-id.js';
import PropTypes from 'prop-types';
import { getProjectByIdApi } from '../../../api/projects/get-project-by-id.js';

export const AddRatingForm = ({ averageRating }) => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.user);

    const [userRating, setUserRating] = useState(null);
    const [hasRated, setHasRated] = useState(false);
    const [newRating, setNewRating] = useState(averageRating);

    useEffect(() => {
        getRatingByProjectIdApi(params.id)
            .then((response) => {
                const currentUserRating = response.data.find(
                    (rating) => rating.user.id === userState.id,
                );
                if (currentUserRating) {
                    setUserRating(currentUserRating.grade);
                    setHasRated(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.id, userState.id]);

    const onSubmit = async (newRating) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await addRatingApi(userState.id, params.id, newRating);
            dispatch(ratingActions.addRating(res.data));

            const updatedProject = await getProjectByIdApi(params.id);
            setNewRating(updatedProject.data.average_grade);
            setUserRating(newRating);
            setHasRated(true);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    return (
        <>
            <LoadingOverlay visible={loading} />
            <Rating
                fractions={2}
                value={userRating ? userRating : 0}
                readOnly={!userState || hasRated}
                onChange={onSubmit}
            />{' '}
            {newRating > 0 && newRating.toFixed(1)}
        </>
    );
};

AddRatingForm.propTypes = {
    averageRating: PropTypes.number,
};
