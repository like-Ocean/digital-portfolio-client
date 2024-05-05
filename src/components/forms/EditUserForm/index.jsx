import { Button, FileInput, Flex, Select, Textarea, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editUserApi } from '../../../api/users/edit-user.js';
import { userActions } from '../../../store/reducers/user-slice.js';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useCountries } from '../../../hooks/useCountries.js';
import { useCities } from '../../../hooks/useCities.js';
import { useResetCity } from '../../../hooks/useResetCity.js';
import { uploadAvatarApi } from '../../../api/users/upload-avatar.js';

const EditUserForm = () => {
    const user = useSelector((state) => state.user.user);
    const [onSendLoading, setLoading] = useState(false);
    const countries = useCountries();
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            ...user,
            country: '',
            city: '',
        },
    });

    const country = watch('country');
    const cities = useCities(country);
    useResetCity(setValue, country);

    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let avatarId = user.avatar ? user.avatar.file_id : null;
            if (data.avatar && data.avatar instanceof File) {
                const formData = new FormData();
                formData.append('file', data.avatar);
                const avatarResponse = await uploadAvatarApi(formData);
                avatarId = avatarResponse.data.file_id;
            }

            const res = await editUserApi(
                user.id,
                data.login,
                data.email,
                data.first_name,
                data.surname,
                data.country,
                data.city,
                avatarId,
                data.phone,
                data.about,
            );
            dispatch(userActions.updateUser(res.data));
            setLoading(false);
        } catch (e) {
            notifications.show({
                title: e.response.data.detail,
                color: 'red',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
                <TextInput label="Логин" {...register('login')} error={errors.login?.message} />

                <TextInput label="Почта" {...register('email')} error={errors.email?.message} />

                <Flex gap={10}>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Имя"
                        error={errors.first_name?.message}
                        {...register('first_name')}
                    />

                    <TextInput
                        style={{ flex: 1 }}
                        label="Фамилия"
                        error={errors.surname?.message}
                        {...register('surname')}
                    />
                </Flex>

                <Flex gap={10}>
                    <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                            <Select
                                style={{ flex: 1 }}
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
                        render={({ field }) => (
                            <Select
                                style={{ flex: 1 }}
                                label="Город"
                                data={cities}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.city?.message}
                                disabled={cities.length === 0}
                            />
                        )}
                    />
                </Flex>

                <TextInput label="Телефон" error={errors.phone?.message} {...register('phone')} />

                <Controller
                    name="avatar"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                        <FileInput
                            {...field}
                            label="Фото профиля"
                            placeholder="Выберите файл"
                            accept="image/*"
                            error={errors.avatar?.message}
                            value={value}
                            onChange={(avatar) => {
                                onChange(avatar);
                            }}
                        />
                    )}
                />

                <Textarea
                    resize="vertical"
                    label="О себе"
                    error={errors.about?.message}
                    {...register('about')}
                />
            </Flex>
            <Button
                type="submit"
                loading={onSendLoading}
                color="blue"
                fullWidth
                mt="md"
                radius="md"
            >
                Сохранить
            </Button>
        </form>
    );
};

export default EditUserForm;
