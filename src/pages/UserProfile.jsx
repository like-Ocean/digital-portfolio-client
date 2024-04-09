import { Layout } from '../components/ui/Layout/index.jsx';
import { Grid, Tabs, Button, Card, Text, Modal } from '@mantine/core';
import { UserInfo } from '../components/ui/UserInfo/index.jsx';
import { ProjectCard } from '../components/ui/ProjectCard/index.jsx';
import { useEffect, useState } from 'react';
import { getUserProjectsApi } from '../api/users/get-user-projects.js';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByIdApi } from '../api/users/get-user-by-id.js';

export const UserProfile = () => {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState();
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const user = await getUserByIdApi(params.id);
                setUser(user.data);
                const projects = await getUserProjectsApi(params.id);
                setProjects(projects.data);
            } catch (e) {
                navigate('/');
            }
        };

        fetch().then();

    }, [params.id, navigate]);

    return (
        <Layout>
            <Grid>
                <Grid.Col span={3}>
                    {user && <UserInfo user={user}/>}
                </Grid.Col>

                <Grid.Col span={9}>
                    <Tabs radius="xs" defaultValue="projects">
                        <Tabs.List>
                            <Tabs.Tab value="projects">Проекты</Tabs.Tab>
                            <Tabs.Tab value="certificates">Сертификаты</Tabs.Tab>
                            <Tabs.Tab value="privacy">Безопасность</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="projects">
                            <Grid mt={10}>
                                <Grid.Col span={4}>
                                    <Card
                                        withBorder
                                        padding="xs"
                                        style={{ cursor: 'pointer' }}
                                        onClick={open}
                                    >
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
                                    <Modal opened={opened} onClose={close} title="Создать проект">
                                        Тут будет добавление проекта
                                    </Modal>
                                </Grid.Col>

                                {projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </Grid>
                        </Tabs.Panel>

                        <Tabs.Panel value="certificates">certificates tab content</Tabs.Panel>

                        <Tabs.Panel value="privacy">
                            privacy tab content
                            <Button color="red" fullWidth mt="xs" radius="md">
                                Удалить
                            </Button>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};
