import { Layout } from '../components/ui/Layout/index.jsx';
import { Flex, Grid, LoadingOverlay, Switch } from '@mantine/core';
import { useProjects } from '../hooks/useProjects.js';
import { ProjectCard } from '../components/ui/ProjectCard/index.jsx';
import { useState } from 'react';
import { useCategories } from '../hooks/useCategories.js';
import { SortingControls } from '../components/ui/SortingControls/index.jsx';
import { UserCard } from '../components/ui/UserCard/index.jsx';
import { useProjectsByCategory } from '../hooks/useProjectsByCategory.js';
import { useFilteredProjects } from '../hooks/useFilteredProjects.js';
import { useSortedProjects } from '../hooks/useSortedProjects.js';
import { UserSortingControls } from '../components/ui/UserSortingControls/index.jsx';

export const Home = () => {
    const [projects, projectsLoading] = useProjects();
    const { categories, categoriesLoading } = useCategories();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [projectsByCategory, setProjectsByCategory] = useProjectsByCategory(
        selectedCategory,
        projects,
    );

    const [sortMethod, setSortMethod] = useState('По рейтингу');

    const [searchValue, setSearchValue] = useState('');
    const filteredProjects = useFilteredProjects(projectsByCategory, searchValue);
    const projectNames = filteredProjects.map((project) => project.name);

    const sortedProjects = useSortedProjects(filteredProjects, sortMethod);

    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [isUserLoaded, setUserLoad] = useState(true);

    return (
        <Layout>
            <Grid>
                <Grid.Col span={12}>
                    <Flex
                        gap="md"
                        align="center"
                        justify="space-between"
                        direction="row"
                        wrap="wrap"
                    >
                        <Switch
                            label="Показать пользователей"
                            checked={showUsers}
                            onChange={(event) => setShowUsers(event.currentTarget.checked)}
                        />
                        <Flex
                            gap="md"
                            align="center"
                            justify="flex-end"
                            direction="row"
                            wrap="wrap"
                        >
                            {!showUsers && (
                                <SortingControls
                                    categories={categories}
                                    categoriesLoading={categoriesLoading}
                                    projectNames={projectNames}
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    setSelectedCategory={setSelectedCategory}
                                    setSortMethod={setSortMethod}
                                />
                            )}
                            {showUsers && (
                                <UserSortingControls
                                    setUsers={setUsers}
                                    setUserLoad={setUserLoad}
                                    showUsers={showUsers}
                                />
                            )}
                        </Flex>
                    </Flex>
                </Grid.Col>
            </Grid>

            <Grid mt={12}>
                {!showUsers &&
                    sortedProjects.map((project) => (
                        <Grid.Col key={project.id} span={{ base: 12, md: 3, lg: 3 }}>
                            <LoadingOverlay visible={projectsLoading} />
                            <ProjectCard project={project} />
                        </Grid.Col>
                    ))}
                {showUsers &&
                    users.map((user) => (
                        <Grid.Col key={user.id} span={{ base: 12, md: 3, lg: 3 }}>
                            <LoadingOverlay visible={isUserLoaded} />
                            <UserCard user={user} />
                        </Grid.Col>
                    ))}
            </Grid>
        </Layout>
    );
};
