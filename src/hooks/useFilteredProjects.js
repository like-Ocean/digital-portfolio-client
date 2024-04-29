import { useState, useEffect } from 'react';

export const useFilteredProjects = (projectsByCategory, searchValue) => {
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        setFilteredProjects(
            projectsByCategory.filter((project) =>
                project.name.toLowerCase().includes(searchValue.toLowerCase()),
            ),
        );
    }, [projectsByCategory, searchValue]);

    return filteredProjects;
};
