import { useState, useEffect } from 'react';
import { getProjectsByCategoryIdApi } from '../api/projects/get-projects-by-category-id.js';

export const useProjectsByCategory = (selectedCategory, projects) => {
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

    return [projectsByCategory, setProjectsByCategory];
};
