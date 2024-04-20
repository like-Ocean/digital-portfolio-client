import { Layout } from '../components/ui/Layout/index.jsx';
import { Autocomplete, Flex, Grid, LoadingOverlay, NativeSelect, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useProjects } from '../hooks/useProjects.js';
import { ProjectCard } from '../components/ui/ProjectCard/index.jsx';

export const Home = () => {
    const [projects, projectsLoading] = useProjects();

    return (
        <Layout>
            <Flex gap="md" align="center" justify="flex-end" direction="row" wrap="wrap">
                <Autocomplete
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                    placeholder="Поиск"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                />
                <NativeSelect data={['Категория 1', 'Категория 2', 'Категория 3']} />
                <NativeSelect data={['По рейтингу', 'По дате']} />
            </Flex>

            <LoadingOverlay visible={projectsLoading} />
            <Grid mt={12}>
                {projects.map((project) => (
                    <Grid.Col key={project.id} span={{ base: 12, md: 3, lg: 3 }}>
                        <ProjectCard project={project} />
                    </Grid.Col>
                ))}
            </Grid>
        </Layout>
    );
};
