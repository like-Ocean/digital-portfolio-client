import { Layout } from '../components/ui/Layout/index.jsx';
import {
    Card,
    Text,
    Button,
    Flex,
    Grid,
    Avatar,
    Badge,
    Tabs,
} from '@mantine/core';

export const UserProfile = () => {
    return (
        <Layout>
            <Grid>
                <Grid.Col span={3}>
                    <Card shadow="xl" padding="md" radius="md">
                        <Flex justify="center" align="center" mt="md" mb="xs">
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                alt="it's me"
                                size={100}
                            />
                        </Flex>
                        <Text align="center" mt="xs" mb="xs" fw={500}>
                            Victor Dudko
                        </Text>
                        <Flex gap="md" justify="center" align="flex-start" direction="column">
                            <Text size="sm">
                                <Badge color="blue" mr="md">
                                    Имя:
                                </Badge>
                                Виктор
                            </Text>

                            <Text size="sm">
                                <Badge color="blue" mr="md">
                                    Фамилия:
                                </Badge>
                                Виктор
                            </Text>

                            <Text size="sm">
                                <Badge color="blue" mr="md">
                                    Телефон:
                                </Badge>
                                +79829282645
                            </Text>

                            <Text size="sm">
                                <Badge color="blue" mr="md">
                                    О себе:
                                </Badge>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                                provident eos fugiat id necessitatibus magni ducimus molestias.
                                Placeat, consequatur. Quisquam, quae magnam perspiciatis excepturi
                                iste sint itaque sunt laborum. Nihil?
                            </Text>
                        </Flex>

                        <Button fullWidth mt="md" radius="md">
                            Изменить
                        </Button>
                        <Button color="red" fullWidth mt="xs" radius="md">
                            Удалить
                        </Button>
                    </Card>
                </Grid.Col>

                <Grid.Col span={9}>
                    <Tabs radius="xs" defaultValue="gallery">
                        <Tabs.List>
                            <Tabs.Tab value="gallery">Проекты</Tabs.Tab>
                            <Tabs.Tab value="messages">Сертификаты</Tabs.Tab>
                            <Tabs.Tab value="settings">Безопасность</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

                        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

                        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};
