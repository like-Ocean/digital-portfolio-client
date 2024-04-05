import { Layout } from '../components/ui/Layout/index.jsx';
import { Card, Grid, Tabs, Image, Text } from '@mantine/core';
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
                            <Grid mt={10}>
                                <Grid.Col span={4}>
                                    <Card
                                        withBorder
                                        padding="xs"
                                        component="a"
                                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                        target="_blank"
                                    >
                                        <Card.Section>
                                            <Image
                                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                                h={200}
                                                alt="No way!"
                                            />
                                        </Card.Section>

                                        <Text fw={500} size="lg" mt="xs">
                                            Название проекта
                                        </Text>

                                        <Text c="dimmed" size="sm">
                                            описание проекта
                                        </Text>
                                    </Card>
                                </Grid.Col>
                            </Grid>
                        </Tabs.Panel>

                        <Tabs.Panel value="certificates">certificates tab content</Tabs.Panel>

                        <Tabs.Panel value="privacy">privacy tab content</Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};
