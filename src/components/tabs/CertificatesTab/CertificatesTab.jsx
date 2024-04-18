import { Box, Card, Grid, LoadingOverlay, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { CertificateCard } from '../../ui/CertificateCard/index.jsx';
import { AddCertificateForm } from '../../forms/AddCertificateForm/index.jsx';
import { useParams } from 'react-router-dom';
import { useCertificatesByUser } from '../../../hooks/useCertificatesByUser.js';
import { useSelector } from 'react-redux';

export const CertificatesTab = () => {
    const { userId } = useParams();

    const [certificates, certificatesLoading] = useCertificatesByUser(userId);
    const userState = useSelector((state) => state.user.user);

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box pos="relative">
            <LoadingOverlay visible={certificatesLoading} />
            <Grid mt={10}>
                {userState.id === userId && (
                    <Grid.Col span={4}>
                        <Card withBorder padding="xs" style={{ cursor: 'pointer' }} onClick={open}>
                            <Card.Section
                                style={{
                                    display: 'flex',
                                    background: '#e1f8fc',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                }}
                            >
                                <IconPlus
                                    style={{ width: 100, height: 100 }}
                                    color="#288ce4"
                                    stroke={1.55}
                                />
                            </Card.Section>

                            <Text fw={500} size="lg" mt="xs">
                                Добавить сертификат
                            </Text>
                        </Card>
                        <Modal opened={opened} onClose={close} title="Добавить сертификат">
                            <AddCertificateForm />
                        </Modal>
                    </Grid.Col>
                )}
                {certificates.map((certificate) => (
                    <CertificateCard key={certificate.id} certificate={certificate} />
                ))}
            </Grid>
        </Box>
    );
};
