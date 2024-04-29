import { Card, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserCard = ({ user }) => {
    const router = useNavigate();

    return (
        <Card
            onClick={() => router(`/profile/${user.id}`)}
            withBorder
            padding="xs"
            style={{ cursor: 'pointer' }}
        >
            <Card.Section>
                <Image src={'/src/assets/9214833.jpg'} h={200} style={{ objectFit: 'cover' }} />
            </Card.Section>

            <Text fw={500} size="lg" mt="xs">
                {user.login}
            </Text>
            <Text c="dimmed" size="sm">
                {user.first_name + ' ' + user.surname}
            </Text>
        </Card>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        first_name: PropTypes.string,
        surname: PropTypes.string,
    }),
};
