import { Layout } from '../components/ui/Layout/index.jsx';
import { Autocomplete, Flex, Grid, LoadingOverlay, NativeSelect, rem } from '@mantine/core';
import { IconSearch, IconEraser } from '@tabler/icons-react';
import { useProjects } from '../hooks/useProjects.js';
import { ProjectCard } from '../components/ui/ProjectCard/index.jsx';
import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories.js';
import { getProjectsByCategoryIdApi } from '../api/projects/get-projects-by-category-id.js';

export const Home = () => {
    const [projects, projectsLoading] = useProjects();
    console.log(projects);
    const { categories, categoriesLoading } = useCategories();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [projectsByCategory, setProjectsByCategory] = useState(projects);

    useEffect(() => {
        if (selectedCategory) {
            getProjectsByCategoryIdApi(selectedCategory)
                .then((response) => {
                    setProjectsByCategory(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setProjectsByCategory(projects);
        }
    }, [selectedCategory, projects]);

    const [searchValue, setSearchValue] = useState('');

    const filteredProjects = projectsByCategory.filter((projects) => {
        return projects.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    const projectNames = filteredProjects.map((project) => project.name);

    return (
        <Layout>
            <Flex gap="md" align="center" justify="flex-end" direction="row" wrap="wrap">
                <Autocomplete
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                    rightSection={
                        <IconEraser
                            onClick={() => setSearchValue('')}
                            color="red"
                            style={{ width: rem(16), height: rem(16), cursor: 'pointer' }}
                        />
                    }
                    placeholder="Поиск"
                    onChange={(event) => setSearchValue(event)}
                    data={projectNames}
                    value={searchValue}
                />
                <LoadingOverlay visible={categoriesLoading} />
                <NativeSelect
                    leftSection={
                        <IconEraser
                            onClick={() => setSelectedCategory(null)}
                            color="red"
                            style={{ width: rem(16), height: rem(16), cursor: 'pointer' }}
                        />
                    }
                    data={categories}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                />
                <NativeSelect data={['По рейтингу', 'По дате']} />
            </Flex>

            <Grid mt={12}>
                <LoadingOverlay visible={projectsLoading} />
                {filteredProjects.map((project) => (
                    <Grid.Col key={project.id} span={{ base: 12, md: 3, lg: 3 }}>
                        <ProjectCard project={project} />
                    </Grid.Col>
                ))}
            </Grid>
        </Layout>
    );
};
