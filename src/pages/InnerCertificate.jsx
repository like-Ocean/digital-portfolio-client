import { ActionIcon, Avatar, Card, Flex, Grid, Modal, Text } from '@mantine/core';
import { Layout } from '../components/ui/Layout/index.jsx';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export const InnerCertificate = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}></Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <div style={{ position: 'relative' }}>
                                <Flex
                                    mih={50}
                                    mb={20}
                                    justify="center"
                                    align="center"
                                    direction="column"
                                >
                                    <Text size="lg" fw={500}>
                                        Название
                                    </Text>

                                    <ActionIcon
                                        variant="filled"
                                        size="lg"
                                        radius="xl"
                                        aria-label="Settings"
                                        style={{ position: 'absolute', right: 0 }}
                                        onClick={open}
                                    >
                                        <IconEdit
                                            style={{ width: '70%', height: '70%' }}
                                            stroke={1.5}
                                        />
                                    </ActionIcon>

                                    <Modal
                                        opened={opened}
                                        onClose={close}
                                        title="Редактировать"
                                        size={800}
                                    ></Modal>
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
                                        KD
                                    </Avatar>
                                    <Text fw={500} style={{ cursor: 'pointer' }}>
                                        логин
                                    </Text>
                                </Flex>

                                <Flex direction="column" gap="sm">
                                    <Flex direction="column">
                                        <Text size="md" fw={500}>
                                            Компания:
                                        </Text>
                                        <Text size="sm">название компании</Text>
                                    </Flex>
                                    <Flex direction="column">
                                        <Text size="md" fw={500}>
                                            Ссылка:
                                        </Text>
                                        <Text size="sm">текст ссылки</Text>
                                    </Flex>
                                </Flex>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
