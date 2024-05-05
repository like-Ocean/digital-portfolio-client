import { Card, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFile } from '../../../api/file/get-file.js';

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
                <Image
                    src={
                        user.avatar
                            ? getFile(user.avatar.file_id)
                            : `https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.surname}&size=250&background=a1c8e8&color=0094d1`
                    }
                    h={200}
                    style={{ objectFit: 'cover' }}
                />
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
        avatar: PropTypes.shape({
            file_id: PropTypes.string,
        }),
    }),
};
