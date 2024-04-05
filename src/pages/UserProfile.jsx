import { Layout } from '../components/ui/Layout/index.jsx';
import { Grid, Tabs } from '@mantine/core';
import { UserInfo } from '../components/ui/UserInfo/index.jsx';

export const UserProfile = () => {
    return (
        <Layout>
            <Grid>
                <Grid.Col span={3}>
                    <UserInfo />
                </Grid.Col>

                <Grid.Col span={9}>
                    <Tabs radius="xs" defaultValue="gallery">
                        <Tabs.List>
                            <Tabs.Tab value="projects">Проекты</Tabs.Tab>
                            <Tabs.Tab value="certificates">Сертификаты</Tabs.Tab>
                            <Tabs.Tab value="privacy">Безопасность</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="projects">
                            projects tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="certificates">certificates tab content</Tabs.Panel>

                        <Tabs.Panel value="privacy">privacy tab content</Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};
