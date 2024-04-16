import { Card, Flex, Grid, LoadingOverlay } from '@mantine/core';
import { Layout } from '../components/ui/Layout/index.jsx';
import { CertificateInfo } from '../components/ui/CertificateInfo/index.jsx';
import { CertificateFileFrame } from '../components/ui/CertificateFileFrame/index.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCertificateById } from '../api/certificates/get-certificate-by-id.js';
import { certificateActions } from '../store/reducers/certificate-slice.js';

export const InnerCertificate = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const certificate = useSelector((state) =>
        state.certificates.certificates.find((p) => p.id.toString() === params.id),
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getCertificateById(params.id);
                dispatch(certificateActions.setCertificates([res.data]));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        void fetch();
    }, [params.id, dispatch]);

    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <LoadingOverlay visible={loading} />
                            {certificate && <CertificateFileFrame file={certificate.file_id} />}
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <LoadingOverlay visible={loading} />
                            {certificate && <CertificateInfo certificate={certificate} />}
                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
