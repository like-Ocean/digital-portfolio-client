import {ActionIcon, Avatar, Card, Flex, LoadingOverlay, Text} from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IconTrash } from '@tabler/icons-react';
import {useSelector} from "react-redux";
import {useState} from "react";
import {deleteCommentApi} from "../../../api/comments/delete-comment.js";

export const Comment = ({ comment, onCommentDelete }) => {
    const router = useNavigate();
    const userState = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        try {
            await deleteCommentApi(userState.id, comment.id);
            onCommentDelete(comment.id)
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <Card shadow="null" withBorder>
            <Flex direction="row" justify="space-between" align="center">
                <Flex direction="row" gap="sm" align="center">
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
                            Дата написания:
                            {new Date(comment.post_date).toISOString().split('T')[0]}
                        </Text>
                    </Flex>
                </Flex>

                <LoadingOverlay visible={loading} />
                {userState.id === comment.user.id && (
                    <Flex justify="space-between">
                        <ActionIcon onClick={onDelete} variant="filled" color="red" radius="xl" aria-label="delete">
                            <IconTrash />
                        </ActionIcon>
                    </Flex>
                )}
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
    onCommentDelete: PropTypes.func
};
