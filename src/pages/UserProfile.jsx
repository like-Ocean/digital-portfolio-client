import { Layout } from '../components/ui/Layout/index.jsx';
import { Grid, Tabs, LoadingOverlay, Box } from '@mantine/core';
import { UserInfo } from '../components/ui/UserInfo/index.jsx';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserById } from '../hooks/useUserById.js';
import { ProjectsTab } from '../components/tabs/ProjectsTab/ProjectsTab.jsx';
import { useSelector } from 'react-redux';
import { CertificatesTab } from '../components/tabs/CertificatesTab/CertificatesTab.jsx';
import { PrivacyTab } from '../components/tabs/PrivacyTab/index.jsx';

export const UserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const userState = useSelector((state) => state.user.user);
    const [user, userLoading, userError] = useUserById(userId);

    useEffect(() => {
        if (userError) navigate('/');
    }, [userError, navigate]);

    return (
        <Layout>
            <Grid>
                <Grid.Col span={{ base: 18, md: 3, lg: 3 }}>
                    <Box pos="relative">
                        <LoadingOverlay visible={userLoading} />
                        <UserInfo user={userState.id === +userId ? userState : user} />
                    </Box>
                </Grid.Col>

                <Grid.Col span={{ base: 18, md: 9, lg: 9 }}>
                    <Tabs radius="xs" defaultValue="projects">
                        <Tabs.List>
                            <Tabs.Tab value="projects">Проекты</Tabs.Tab>
                            <Tabs.Tab value="certificates">Сертификаты</Tabs.Tab>
                            {userState.id === +userId && (
                                <Tabs.Tab value="privacy">Безопасность</Tabs.Tab>
                            )}
                        </Tabs.List>

                        <Tabs.Panel value="projects">
                            <ProjectsTab />
                        </Tabs.Panel>

                        <Tabs.Panel value="certificates">
                            <CertificatesTab />
                        </Tabs.Panel>

                        {userState.id === +userId && (
                            <Tabs.Panel value="privacy">
                                <PrivacyTab />
                            </Tabs.Panel>
                        )}
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};
