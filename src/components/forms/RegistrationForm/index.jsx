import { Button, Flex, PasswordInput, Select, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import {
    emailValidation,
    passwordValidation,
    requiredValidation,
} from '../../../constants/validation.js';
import { useEffect, useMemo, useState } from 'react';
import { registrationApi } from '../../../api/users/registration.js';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useAreas } from '../../../hooks/useAreas.js';

const RegistrationForm = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const [areas] = useAreas();
    const [loading, setLoading] = useState(false);

    const country = watch('country');

    const countries = useMemo(() => {
        return areas.map((area) => area.name);
    }, [areas]);

    const cities = useMemo(() => {
        if (!country) return [];

        const regions = areas.find((area) => area.name === country).areas;

        const cities = [];

        regions.forEach((region) => {
            if (region.areas.length === 0) {
                cities.push(region.name);
            } else {
                region.areas.forEach((city) => {
                    cities.push(city.name);
                });
            }
        });

        return [...new Set(cities)].sort();
    }, [areas, country]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await registrationApi(
                data.login,
                data.email,
                data.first_name,
                data.surname,
                data.city,
                data.password,
            );
            navigate('/authorization');
        } catch (e) {
            notifications.show({
                title: e.response.data.detail,
                color: 'red',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        setValue('city', null);
    }, [setValue, country]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
                <TextInput
                    label="Логин"
                    error={errors.login?.message}
                    {...register('login', requiredValidation())}
                />

                <TextInput
                    label="Почта"
                    error={errors.email?.message}
                    {...register('email', emailValidation())}
                />

                <Flex gap={10}>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Имя"
                        error={errors.first_name?.message}
                        {...register('first_name', requiredValidation())}
                    />

                    <TextInput
                        style={{ flex: 1 }}
                        label="Фамилия"
                        error={errors.surname?.message}
                        {...register('surname', requiredValidation())}
                    />
                </Flex>

                <Controller
                    control={control}
                    name="country"
                    rules={requiredValidation()}
                    render={({ field }) => (
                        <Select
                            label="Страна"
                            data={countries}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.country?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="city"
                    rules={requiredValidation()}
                    render={({ field }) => (
                        <Select
                            label="Город"
                            data={cities}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.city?.message}
                            disabled={cities.length === 0}
                        />
                    )}
                />

                <PasswordInput
                    label="Пароль"
                    error={errors.password?.message}
                    {...register('password', passwordValidation())}
                />
            </Flex>

            <Button type="submit" loading={loading} color="blue" fullWidth mt="md" radius="md">
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default RegistrationForm;
