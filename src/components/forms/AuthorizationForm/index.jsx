import { Button, Flex, PasswordInput, rem, TextInput } from '@mantine/core';
import { passwordValidation, requiredValidation } from '../../../constants/validation.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authorizationApi } from '../../../api/users/authorization.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/reducers/user-slice.js';
import { IconKey, IconUser } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const AuthorizationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await authorizationApi(data.login.trim(), data.password);
            dispatch(userActions.login(res.data));
            navigate('/');
        } catch (e) {
            notifications.show({
                title: e.response.data.detail,
                color: 'red',
            });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
                <TextInput
                    label="Логин"
                    error={errors.login?.message}
                    leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                    {...register('login', requiredValidation())}
                />

                <PasswordInput
                    label="Пароль"
                    error={errors.password?.message}
                    leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                    {...register('password', passwordValidation())}
                />
            </Flex>

            <Button type="submit" loading={loading} color="blue" fullWidth mt="md" radius="md">
                Войти
            </Button>
        </form>
    );
};

export default AuthorizationForm;
