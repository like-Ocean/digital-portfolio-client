import { Layout } from '../components/ui/Layout/index.jsx';
import { Image, Flex, Text, Card, Button, Grid, Stack, Avatar, Rating } from '@mantine/core';

export const InnerProject = () => {
    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={6}>
                            <Stack align="center" gap="sm">
                                <Image
                                    radius="md"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                                />
                                <Image
                                    radius="md"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Flex
                                mih={50}
                                mb={20}
                                justify="center"
                                align="center"
                                direction="column"
                            >
                                <Text size="lg" fw={500}>
                                    Название проекта
                                </Text>
                                <Text size="sm" c="dimmed">
                                    12.09.23
                                </Text>
                            </Flex>

                            <Flex
                                mih={50}
                                mb={20}
                                justify="flex-start"
                                align="center"
                                direction="row"
                                gap="sm"
                            >
                                <Avatar color="cyan" size={50}>
                                    BK
                                </Avatar>
                                <Text fw={500}>Имя пользователя</Text>
                            </Flex>

                            <Flex direction="column" gap="sm">
                                <Text size="md" fw={500}>
                                    Категория:
                                    <Text size="sm">Сварка</Text>
                                </Text>

                                <Text size="md" fw={500}>
                                    Описание:
                                    <Text size="sm">
                                        Сварка - это один из самых важных процессов в
                                        промышленности, строительстве и производстве. Создание
                                        сварочного проекта требует не только хорошего понимания
                                        технологий сварки, но и учета множества других факторов.
                                        Давайте рассмотрим ключевые этапы и особенности разработки
                                        сварочного проекта.
                                    </Text>
                                </Text>
                                <Flex gap="sm" align="center" justify="flex-start">
                                    <Text size="md" fw={500}>
                                        Оценки
                                    </Text>
                                    <Rating fractions={2} defaultValue={1.5} /> 3.9
                                </Flex>
                                <Text size="md" fw={500}>
                                    Комментарии
                                </Text>
                                <Card>Коммен 1</Card>
                                <Card>Коммен 2</Card>
                                <Card>Коммен 3</Card>
                                <Card>Коммен 4</Card>
                            </Flex>


                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
