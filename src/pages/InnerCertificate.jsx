import { Card, Flex, Grid, Stack } from '@mantine/core';
import { Layout } from '../components/ui/Layout/index.jsx';
import { getFile } from '../api/file/get-file.js';
import { CertificateInfo } from '../components/ui/CertificateInfo/index.jsx';

export const InnerCertificate = () => {
    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <Stack align="center" gap="sm">
                                <object
                                    data={getFile('5c937008-8104-4327-bc77-57fddc22d383')}
                                    width={470}
                                    height={600}
                                />
                                <embed
                                    src={getFile('5c937008-8104-4327-bc77-57fddc22d383')}
                                    width={470}
                                    height={600}
                                />
                                <iframe
                                    width={470}
                                    height={600}
                                    frameBorder={0}
                                    src={getFile('5c937008-8104-4327-bc77-57fddc22d383')}
                                />
                            </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <CertificateInfo />
                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
