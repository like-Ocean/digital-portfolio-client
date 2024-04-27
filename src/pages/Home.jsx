import { Layout } from '../components/ui/Layout/index.jsx';
import { Flex, Grid, LoadingOverlay } from '@mantine/core';
import { useProjects } from '../hooks/useProjects.js';
import { ProjectCard } from '../components/ui/ProjectCard/index.jsx';
import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories.js';
import { getProjectsByCategoryIdApi } from '../api/projects/get-projects-by-category-id.js';
import { SortingControls } from '../components/ui/SortingControls/index.jsx';

export const Home = () => {
    const [projects, projectsLoading] = useProjects();
    const { categories, categoriesLoading } = useCategories();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [projectsByCategory, setProjectsByCategory] = useState(projects);

    const [sortMethod, setSortMethod] = useState('По рейтингу');

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

    let sortedProjects = [...filteredProjects];

    if (sortMethod === 'По рейтингу') {
        sortedProjects.sort(
            (project1, project2) => project2.average_grade - project1.average_grade,
        );
    } else if (sortMethod === 'По дате') {
        sortedProjects.sort(
            (project1, project2) =>
                new Date(project2.creation_date) - new Date(project1.creation_date),
        );
    }

    return (
        <Layout>
            <Flex gap="md" align="center" justify="flex-end" direction="row" wrap="wrap">
                <SortingControls
                    categories={categories}
                    categoriesLoading={categoriesLoading}
                    projectNames={projectNames}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setSelectedCategory={setSelectedCategory}
                    setSortMethod={setSortMethod}
                />
            </Flex>

            <Grid mt={12}>
                <LoadingOverlay visible={projectsLoading} />
                {sortedProjects.map((project) => (
                    <Grid.Col key={project.id} span={{ base: 12, md: 3, lg: 3 }}>
                        <ProjectCard project={project} />
                    </Grid.Col>
                ))}
            </Grid>
        </Layout>
    );
};
