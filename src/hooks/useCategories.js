import { useEffect, useState } from 'react';
import {getCategoriesApi} from "../api/categories/get-categories.js";


export const useCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            try {
                const res = await getCategoriesApi();
                setCategories(
                    res.data.map((category) => ({
                        value: category.id,
                        label: category.name,
                    })),
                );
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        loadCategories();
    }, []);

    return { categories, loading };
};
