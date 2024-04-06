import { Avatar, Badge, Button, Card, Flex, Text } from '@mantine/core';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <Card shadow="xl" padding="md">
            <Flex justify="center" align="center" mt="md" mb="xs">
                <Avatar color="cyan" size={90}>
                    {user.first_name[0] + user.surname[0]}
                </Avatar>
            </Flex>
            <Text align="center" mt="xs" mb="xs" fw={500}>
                {user.login}
            </Text>
            <Flex gap="md" justify="center" align="flex-start" direction="column">
                <Text size="sm">
                    <Badge color="blue" mr="md">
                        Имя:
                    </Badge>
                    {user.first_name}
                </Text>

                <Text size="sm">
                    <Badge color="blue" mr="md">
                        Фамилия:
                    </Badge>
                    {user.surname}
                </Text>

                <Text size="sm">
                    <Badge color="blue" mr="md">
                        Телефон:
                    </Badge>
                    {user.phone}
                </Text>

                <Text size="sm">
                    <Badge color="blue" mr="md">
                        Почта:
                    </Badge>
                    {user.email}
                </Text>

                <Text size="sm">
                    <Badge color="blue" mr="md">
                        О себе:
                    </Badge>
                    {user.about}
                </Text>
            </Flex>

            <Button fullWidth mt="md" radius="md">
                Изменить
            </Button>
        </Card>
    );
};
