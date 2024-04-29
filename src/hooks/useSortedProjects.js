import { useState, useEffect } from 'react';

export const useSortedProjects = (filteredProjects, sortMethod) => {
    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {
        let sorted = [...filteredProjects];

        if (sortMethod === 'По рейтингу') {
            sorted.sort((project1, project2) => project2.average_grade - project1.average_grade);
        } else if (sortMethod === 'По дате') {
            sorted.sort(
                (project1, project2) =>
                    new Date(project2.creation_date) - new Date(project1.creation_date),
            );
        }

        setSortedProjects(sorted);
    }, [filteredProjects, sortMethod]);

    return sortedProjects;
};
