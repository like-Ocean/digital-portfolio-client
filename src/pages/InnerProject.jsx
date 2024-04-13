import { Layout } from '../components/ui/Layout/index.jsx';
import { Flex, Card, Grid, LoadingOverlay } from '@mantine/core';
import { ProjectInfo } from '../components/ui/ProjectInfo/index.jsx';
import { ProjectImgs } from '../components/ui/ProjectImgs/index.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectByIdApi } from '../api/projects/get-project-by-id.js';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../store/reducers/project-slice.js';

export const InnerProject = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projects.projects.find((p) => p.id.toString() === params.id));

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getProjectByIdApi(params.id);
                dispatch(projectActions.setProjects([res.data]));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        void fetch();
    }, [params.id, dispatch]);

    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <LoadingOverlay visible={loading} />
                            {project && <ProjectImgs files={project.files} />}
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <LoadingOverlay visible={loading} />
                            {project && <ProjectInfo project={project} />}
                        </Grid.Col>
                    </Grid>
                </Card>
            </Flex>
        </Layout>
    );
};
