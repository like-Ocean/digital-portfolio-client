import {Avatar, Badge, Button, Card, Flex, Modal, Text} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import EditUserForm from "../../forms/EditUserForm/index.jsx";
import PropTypes from "prop-types";

export const UserInfo = ({ user }) => {

    const [opened, { open, close }] = useDisclosure(false);
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


            <Modal opened={opened} onClose={close} title="Редактировать" size={550}>
                <EditUserForm opened={opened} onClose={close} />
            </Modal>

            <Button fullWidth mt="md" radius="md" onClick={open}>
                Изменить
            </Button>
        </Card>
    );
};

UserInfo.propTypes = {
    user:{
        id: PropTypes.number,
        login: PropTypes.string,
        email: PropTypes.string,
        first_name: PropTypes.string,
        surname: PropTypes.string,
        phone: PropTypes.string,
        about: PropTypes.string,
    }
};
