import { ActionIcon, Avatar, Flex, Modal, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EditProjectForm } from '../../forms/EditProjectForm/index.jsx';
import { AddRatingForm } from '../../forms/AddRatingForm/index.jsx';

export const ProjectInfo = ({ project }) => {
    const userState = useSelector((state) => state.user.user);

    const router = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div style={{ position: 'relative' }}>
            <Flex w="100%" mb={20} justify="space-between" align="center">
                <Flex mih={50} justify="flex-start" align="center" direction="row" gap="sm">
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
                        onClick={open}
                    >
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                )}

                <Modal opened={opened} onClose={close} title="Редактировать" size={800}>
                    <EditProjectForm />
                </Modal>
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
