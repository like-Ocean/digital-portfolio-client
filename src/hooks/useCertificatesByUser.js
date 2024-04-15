import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesApi } from '../api/categories/get-categories.js';
import { certificateActions } from '../store/reducers/certificate-slice.js';
import { getUserCertificatesApi } from '../api/users/get-user-certificates.js';

export const useCertificatesByUser = (userId) => {
    const dispatch = useDispatch();

    const certificates = useSelector((state) => state.certificates.certificates);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getUserCertificatesApi(userId);
                dispatch(certificateActions.setCertificates(res.data));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetch().then();
    }, [userId, dispatch]);

    return [certificates, loading, error];
};
