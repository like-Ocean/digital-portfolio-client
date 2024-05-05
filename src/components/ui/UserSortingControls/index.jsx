import { useState, useEffect } from 'react';
import { Autocomplete, rem, NativeSelect } from '@mantine/core';
import { IconEraser, IconSearch } from '@tabler/icons-react';
import { useCountries } from '../../../hooks/useCountries.js';
import { useCities } from '../../../hooks/useCities.js';
import { getAllUsers } from '../../../api/users/get-all-users.js';
import PropTypes from 'prop-types';

export const UserSortingControls = ({ setUsers, setUserLoad, showUsers }) => {
    const [countryFilter, setCountryFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const countries = useCountries();
    const cities = useCities(countryFilter);

    useEffect(() => {
        if (!showUsers) return;
        const loadUsers = async () => {
            setUserLoad(true);
            try {
                const res = await getAllUsers();
                const filteredUsers = res.data.filter((user) => {
                    return (
                        (!countryFilter || user.country === countryFilter) &&
                        (!cityFilter || user.city === cityFilter) &&
                        (!searchValue ||
                            user.login.toLowerCase().includes(searchValue.toLowerCase()) ||
                            user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            user.surname.toLowerCase().includes(searchValue.toLowerCase()))
                    );
                });
                setUsers(filteredUsers);
            } catch (e) {
                console.log(e);
            }
            setUserLoad(false);
        };
        void loadUsers();
    }, [showUsers, countryFilter, cityFilter, searchValue, setUserLoad, setUsers]);

    return (
        <>
            <Autocomplete
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                rightSection={
                    <IconEraser
                        onClick={() => {
                            setSearchValue('');
                            setCountryFilter('');
                            setCityFilter('');
                        }}
                        color="red"
                        style={{ width: rem(16), height: rem(16), cursor: 'pointer' }}
                    />
                }
                placeholder="Поиск"
                value={searchValue}
                onChange={(value) => setSearchValue(value)}
            />
            <NativeSelect
                leftSection={
                    <IconEraser
                        onClick={() => {
                            setCountryFilter('');
                            setCityFilter('');
                        }}
                        color="red"
                        style={{ width: rem(16), height: rem(16), cursor: 'pointer' }}
                    />
                }
                data={countries}
                value={countryFilter}
                onChange={(event) => setCountryFilter(event.currentTarget.value)}
                placeholder="Страна"
            />
            <NativeSelect
                leftSection={
                    <IconEraser
                        onClick={() => {
                            setCountryFilter('');
                            setCityFilter('');
                        }}
                        color="red"
                        style={{ width: rem(16), height: rem(16), cursor: 'pointer' }}
                    />
                }
                data={cities}
                value={cityFilter}
                onChange={(event) => setCityFilter(event.currentTarget.value)}
                placeholder="Город"
            />
        </>
    );
};

UserSortingControls.propTypes = {
    setUsers: PropTypes.func,
    setUserLoad: PropTypes.func,
    showUsers: PropTypes.bool,
};
