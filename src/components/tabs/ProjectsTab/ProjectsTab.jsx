import { Box, Card, Grid, LoadingOverlay, Modal, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ProjectCard } from '../../ui/ProjectCard/index.jsx';
import { useDisclosure } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useProjectsByUser } from '../../../hooks/useProjectsByUser.js';
import { useSelector } from 'react-redux';
import { CreateProjectForm } from '../../forms/CreateProjectForm/index.jsx';

export const ProjectsTab = () => {
    const { userId } = useParams();

    const [projects, projectsLoading] = useProjectsByUser(userId);
    const userState = useSelector((state) => state.user.user);

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box pos="relative">
            <LoadingOverlay visible={projectsLoading} />
            <Grid mt={10}>
                {userState.id.toString() === userId && (
                    <Grid.Col span={4}>
                        <Card withBorder padding="xs" style={{ cursor: 'pointer' }} onClick={open}>
                            <Card.Section
                                style={{
                                    display: 'flex',
                                    background: '#e1f8fc',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                }}
                            >
                                <IconPlus
                                    style={{ width: 100, height: 100 }}
                                    color="#288ce4"
                                    stroke={1.55}
                                />
                            </Card.Section>

                            <Text fw={500} size="lg" mt="xs">
                                Создать проект
                            </Text>
                        </Card>
                        <Modal opened={opened} onClose={close} title="Создание проекта">
                            <CreateProjectForm />
                        </Modal>
                    </Grid.Col>
                )}
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </Grid>
        </Box>
    );
};
