import { Avatar, Card, Flex, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Comment = ({ comment }) => {
    const router = useNavigate();
    return (
        <Card shadow="null" withBorder>
            <Flex direction="row" gap="sm" justify="flex-start" align="center">
                <Avatar color="red" size={40}>
                    {comment.user.first_name[0] + comment.user.surname[0]}
                </Avatar>
                <Flex direction="column">
                    <Text
                        fw={500}
                        size="md"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router(`/profile/${comment.user.id}`)}
                    >
                        {comment.user.login}
                    </Text>
                    <Text size="xs" c="dimmed">
                        Дата написания: {comment.post_date}
                    </Text>
                </Flex>
            </Flex>
            <Text mt="md">{comment.comment}</Text>
        </Card>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number,
        comment: PropTypes.string,
        post_date: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            first_name: PropTypes.string,
            surname: PropTypes.string,
        }),
    }),
};
