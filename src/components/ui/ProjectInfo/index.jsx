import { ActionIcon, Avatar, Flex, LoadingOverlay, Modal, Text } from '@mantine/core';
import { Comment } from '../Comment/index.jsx';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AddCommentForm } from '../../forms/AddCommentForm/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../../store/reducers/comment-slice.js';
import { EditProjectForm } from '../../forms/EditProjectForm/index.jsx';
import { useCommentsByProjectId } from '../../../hooks/useCommentsByProjectId.js';
import { AddRatingForm } from '../../forms/AddRatingForm/index.jsx';

export const ProjectInfo = ({ project }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    const userState = useSelector((state) => state.user.user);

    const router = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    const params = useParams();

    const onCommentSubmit = (newComment) => {
        dispatch(commentActions.addComment(newComment));
    };

    const { loading, error } = useCommentsByProjectId(params.id);

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
                {userState.id === project.user.id && (
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
                )}
                <Modal opened={opened} onClose={close} title="Редактировать" size={800}>
                    <EditProjectForm />
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
                    {project && <AddRatingForm averageRating={project.average_grade} />}
                </Flex>

                <Text size="md" fw={500}>
                    Комментарии:
                </Text>

                <LoadingOverlay visible={loading} />
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                {userState.id && <AddCommentForm onCommentSubmit={onCommentSubmit} />}
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
        average_grade: PropTypes.number,
    }),
};
