import { Avatar, Badge, Button, Card, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditUserForm from '../../forms/EditUserForm/index.jsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const UserInfo = ({ user }) => {
    const userState = useSelector((state) => state.user.user);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Card shadow="xl" padding="md">
            <Flex justify="center" align="center" mt="md" mb="xs">
                <Avatar color="cyan" size={90}>
                    {user?.first_name[0] + user?.surname[0]}
                </Avatar>
            </Flex>
            <Text align="center" mt="xs" mb="xs" fw={500}>
                {user?.login}
            </Text>
            <Flex gap="md" justify="center" align="flex-start" direction="column">
                <Flex>
                    <Badge color="blue" mr="md">
                        Имя:
                    </Badge>
                    <Text size="sm">{user?.first_name}</Text>
                </Flex>

                <Flex>
                    <Badge color="blue" mr="md">
                        Фамилия:
                    </Badge>
                    <Text size="sm">{user?.surname}</Text>
                </Flex>

                <Flex>
                    <Badge color="blue" mr="md">
                        Телефон:
                    </Badge>
                    <Text size="sm">{user?.phone}</Text>
                </Flex>

                <Flex>
                    <Badge color="blue" mr="md">
                        Почта:
                    </Badge>
                    <Text size="sm">{user?.email}</Text>
                </Flex>

                <Flex direction="column">
                    <Badge color="blue">
                        О себе:
                    </Badge>
                    <Text size="sm">{user?.about}</Text>
                </Flex>
            </Flex>

            <Modal opened={opened} onClose={close} title="Редактировать" size={550}>
                <EditUserForm opened={opened} onClose={close} />
            </Modal>

            {userState?.id === user?.id && (
                <Button fullWidth mt="md" radius="md" onClick={open}>
                    Изменить
                </Button>
            )}
        </Card>
    );
};

UserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        email: PropTypes.string,
        first_name: PropTypes.string,
        surname: PropTypes.string,
        phone: PropTypes.string,
        about: PropTypes.string,
    }),
};
