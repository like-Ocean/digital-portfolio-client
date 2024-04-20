import { LoadingOverlay, Rating } from '@mantine/core';
import { useEffect, useState } from 'react';
import { addRatingApi } from '../../../api/ratings/add-rating.js';
import { ratingActions } from '../../../store/reducers/rating-slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRatingByProjectIdApi } from '../../../api/ratings/get-rating-by-project-id.js';

// Полная хуйня, надо переделывать
export const AddRatingForm = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.user);

    const [averageRating, setAverageRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [hasRated, setHasRated] = useState(false);
    useEffect(() => {
        getRatingByProjectIdApi(params.id)
            .then((response) => {
                console.log(response.data);
                const totalRating = response.data.reduce(
                    (total, rating) => total + rating.grade,
                    0,
                );
                const averageRating = parseFloat((totalRating / response.data.length).toFixed(1));
                setAverageRating(averageRating);

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
    }, [params.id]);

    const onSubmit = async (newRating) => {
        setLoading(true);
        try {
            const res = await addRatingApi(userState.id, params.id, newRating);
            dispatch(ratingActions.addRating(res.data));

            const response = await getRatingByProjectIdApi(params.id);
            const totalRating = response.data.reduce((total, rating) => total + rating.grade, 0);
            const newAverageRating = parseFloat((totalRating / response.data.length).toFixed(1));
            setAverageRating(newAverageRating);
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
                readOnly={hasRated}
                onChange={onSubmit}
            />{' '}
            {averageRating > 0 && averageRating}
        </>
    );
};
