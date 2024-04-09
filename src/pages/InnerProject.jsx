import { Layout } from '../components/ui/Layout/index.jsx';
import {Flex, Card, Button, Grid, ActionIcon} from '@mantine/core';
import {ProjectInfo} from "../components/ui/ProjectInfo/index.jsx";
import {ProjectImgs} from "../components/ui/ProjectImgs/index.jsx";
import { IconEdit } from '@tabler/icons-react';

export const InnerProject = () => {
    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={6}>
                            <ProjectImgs/>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <ProjectInfo/>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
