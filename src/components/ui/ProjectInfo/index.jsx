import {ActionIcon, Avatar, Flex, Modal, Rating, Text} from '@mantine/core';
import { Comment } from '../Comment/index.jsx';
import { IconEdit } from '@tabler/icons-react';
import {useDisclosure} from "@mantine/hooks";

export const ProjectInfo = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <div style={{ position: 'relative' }}>
            <Flex mih={50} mb={20} justify="center" align="center" direction="column">
                <Flex direction="column" align="center">
                    <Text size="lg" fw={500}>
                        Название проекта
                    </Text>
                    <Text size="sm" c="dimmed">
                        12.09.23
                    </Text>
                </Flex>
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
                <Modal opened={opened} onClose={close} title="Authentication">
                    {/* Modal content */}
                </Modal>
            </Flex>
            <Flex mih={50} mb={20} justify="flex-start" align="center" direction="row" gap="sm">
                <Avatar color="cyan" size={50}>
                    BK
                </Avatar>
                <Text fw={500}>Логин пользователя</Text>
            </Flex>

            <Flex direction="column" gap="sm">
                <Text size="md" fw={500}>
                    Категория:
                    <Text size="sm">Сварка</Text>
                </Text>

                <Text size="md" fw={500}>
                    Описание:
                    <Text size="sm">
                        Сварка - это один из самых важных процессов в промышленности, строительстве
                        и производстве. Создание сварочного проекта требует не только хорошего
                        понимания технологий сварки, но и учета множества других факторов. Давайте
                        рассмотрим ключевые этапы и особенности разработки сварочного проекта.
                    </Text>
                </Text>
                <Flex gap="sm" align="center" justify="flex-start">
                    <Text size="md" fw={500}>
                        Оценки
                    </Text>
                    <Rating fractions={2} defaultValue={1.5} /> 3.9
                </Flex>
                <Text size="md" fw={500}>
                    Комментарии:
                </Text>
                <Comment />
                <Comment />
            </Flex>
        </div>
    );
};
