import { Autocomplete, rem, LoadingOverlay, NativeSelect } from '@mantine/core';
import { IconSearch, IconEraser } from '@tabler/icons-react';
import PropTypes from 'prop-types';

export const SortingControls = ({
    categories,
    categoriesLoading,
    projectNames,
    searchValue,
    setSearchValue,
    setSelectedCategory,
    setSortMethod,
}) => {
    const defaultOption = { value: null, label: 'По умолчанию' };
    const categoryOptions = [defaultOption, ...categories];

    const setSelectedCategoryHandler = (value) => {
        if (value === 'По умолчанию') return setSelectedCategory(undefined);

        setSelectedCategory(value);
    };

    return (
        <>
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
                data={categoryOptions}
                onChange={(event) => setSelectedCategoryHandler(event.target.value)}
            />
            <NativeSelect
                data={['По рейтингу', 'По дате']}
                onChange={(event) => setSortMethod(event.target.value)}
            />
        </>
    );
};

SortingControls.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
            label: PropTypes.string,
        }),
    ),
    categoriesLoading: PropTypes.bool,
    projectNames: PropTypes.arrayOf(PropTypes.string),
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
    selectedCategory: PropTypes.string,
    setSelectedCategory: PropTypes.func,
    sortMethod: PropTypes.string,
    setSortMethod: PropTypes.func,
};
