import { ActionIcon, Avatar, Flex, Modal, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EditCertificateForm } from '../../forms/EditCertificateForm/index.jsx';

export const CertificateInfo = ({ certificate }) => {
    const router = useNavigate();
    const userState = useSelector((state) => state.user.user);

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div style={{ position: 'relative' }}>
            <Flex mih={50} mb={20} justify="center" align="center" direction="column">
                <Text size="lg" fw={500}>
                    {certificate.name}
                </Text>
                {userState.id === certificate.user.id && (
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
                )}
                <Modal opened={opened} onClose={close} title="Редактировать" size={400}>
                    <EditCertificateForm />
                </Modal>
            </Flex>
            <Flex mih={50} mb={20} justify="flex-start" align="center" direction="row" gap="sm">
                <Avatar color="cyan" size={50}>
                    {certificate.user &&
                        certificate.user.first_name[0] + certificate.user.surname[0]}
                </Avatar>
                <Text
                    fw={500}
                    style={{ cursor: 'pointer' }}
                    onClick={() => router(`/profile/${certificate.user.id}`)}
                >
                    {certificate.user && certificate.user.login}
                </Text>
            </Flex>

            <Flex direction="column" gap="sm">
                {certificate.company ? (
                    <Flex direction="column">
                        <Text size="md" fw={500}>
                            Компания:
                        </Text>
                        <Text size="sm">{certificate.company}</Text>
                    </Flex>
                ) : (
                    <div></div>
                )}
                {certificate.link ? (
                    <Flex direction="column">
                        <Text size="md" fw={500}>
                            Ссылка:
                        </Text>
                        <Text size="sm">{certificate.link}</Text>
                    </Flex>
                ) : (
                    <div></div>
                )}
            </Flex>
        </div>
    );
};

CertificateInfo.propTypes = {
    certificate: PropTypes.shape({
        id: PropTypes.number,
        company: PropTypes.string,
        link: PropTypes.string,
        name: PropTypes.string,
        user: PropTypes.shape({
            first_name: PropTypes.string,
            id: PropTypes.number,
            login: PropTypes.string,
            surname: PropTypes.string,
        }),
    }),
};
