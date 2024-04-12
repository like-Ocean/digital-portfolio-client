import { ActionIcon, Avatar, Flex, LoadingOverlay, Modal, Rating, Text } from '@mantine/core';
import { Comment } from '../Comment/index.jsx';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCommentsByProjectIdAPI } from '../../../api/comments/get-comments-by-project-id.js';
import { AddCommentForm } from '../../forms/AddCommentForm/index.jsx';

export const ProjectInfo = ({ project }) => {
    const router = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    const params = useParams();
    const [comments, setComment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const onCommentSubmit = (newComment) => {
        setComment([...comments, newComment]);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getCommentsByProjectIdAPI(params.id);
                setComment(res.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetch();
    }, [params.id]);

    return (
        <div style={{ position: 'relative' }}>
            <Flex mih={50} mb={20} justify="center" align="center" direction="column">
                <Flex direction="column" align="center">
                    <Text size="lg" fw={500}>
                        {project.name}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {project.creation_date}
                    </Text>
                </Flex>
                <ActionIcon
                    variant="filled"
                    size="lg"
                    radius="xl"
                    aria-label="Settings"
                    style={{ position: 'absolute', right: 0 }}
                    onClick={open}
                >
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Modal opened={opened} onClose={close} title="Редактировать">
                    изменить инфу проекта и удалить проект
                </Modal>
            </Flex>
            <Flex mih={50} mb={20} justify="flex-start" align="center" direction="row" gap="sm">
                <Avatar color="cyan" size={50}>
                    {project.user && project.user.first_name[0] + project.user.surname[0]}
                </Avatar>
                <Text
                    fw={500}
                    onClick={() => router(`/profile/${project.user.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    {project.user && project.user.login}
                </Text>
            </Flex>

            <Flex direction="column" gap="sm">
                <Flex direction="column">
                    <Text size="md" fw={500}>
                        Категория:
                    </Text>
                    <Text size="sm">{project.category && project.category.name}</Text>
                </Flex>
                <Flex direction="column">
                    <Text size="md" fw={500}>
                        Описание:
                    </Text>
                    <Text size="sm">{project.description}</Text>
                </Flex>

                <Flex gap="sm" align="center" justify="flex-start">
                    <Text size="md" fw={500}>
                        Оценки:
                    </Text>
                    <Rating fractions={2} defaultValue={1.5} /> 3.9
                </Flex>

                <Text size="md" fw={500}>
                    Комментарии:
                </Text>

                <LoadingOverlay visible={loading} />
                {comments.map(
                    (comment) => <Comment key={comment.id} comment={comment} />)
                }

                <AddCommentForm onCommentSubmit={onCommentSubmit}/>
            </Flex>
        </div>
    );
};

ProjectInfo.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        creation_date: PropTypes.string,
        description: PropTypes.string,

        category: PropTypes.shape({
            name: PropTypes.string,
        }),
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            first_name: PropTypes.string,
            surname: PropTypes.string,
        }),
        files: PropTypes.arrayOf(
            PropTypes.shape({
                file_id: PropTypes.string,
            }),
        ),
    }),
};
