import { Button, Flex, Textarea, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editUserApi } from '../../../api/users/edit-user.js';
import { userActions } from '../../../store/reducers/user-slice.js';
import { notifications } from '@mantine/notifications';

const EditUserForm = () => {
    const user = useSelector((state) => state.user.user);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: user });

    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        try {
            const res = await editUserApi(
                user.id,
                data.login,
                data.email,
                data.first_name,
                data.surname,
                data.phone,
                data.about,
            );
            dispatch(userActions.updateUser(res.data));
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
                <TextInput label="Телефон" error={errors.phone?.message} {...register('phone')} />
                <Textarea
                    resize="vertical"
                    label="О себе"
                    error={errors.about?.message}
                    {...register('about')}
                />
            </Flex>
            <Button type="submit" color="blue" fullWidth mt="md" radius="md">
                Сохранить
            </Button>
        </form>
    );
};

export default EditUserForm;
