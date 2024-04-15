import { Card, Grid, Image, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const CertificateCard = ({ certificate }) => {
    const router = useNavigate();

    return (
        <Grid.Col span={4}>
            <Card
                onClick={() => router(`/certificate/${certificate.id}`)}
                withBorder
                padding="xs"
                style={{ cursor: 'pointer' }}
            >
                <Card.Section>
                    <Image src={'/src/assets/4751965.jpg'} h={200} style={{ objectFit: 'cover' }} />
                </Card.Section>
                <Text fw={500} size="lg" mt="xs">
                    {certificate.name}
                </Text>
            </Card>
        </Grid.Col>
    );
};

CertificateCard.propTypes = {
    certificate: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        file_id: PropTypes.string,
    }),
};
