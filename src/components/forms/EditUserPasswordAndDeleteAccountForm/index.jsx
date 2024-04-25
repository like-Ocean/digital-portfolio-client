import { Button, Flex, LoadingOverlay, PasswordInput, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordValidation } from '../../../constants/validation.js';
import { IconKey } from '@tabler/icons-react';
import { editPasswordApi } from '../../../api/users/edit-password.js';
import { deleteAccountApi } from '../../../api/users/delete-account.js';
import { userActions } from '../../../store/reducers/user-slice.js';
import { notifications } from '@mantine/notifications';

export const EditUserPasswordAndDeleteAccountForm = () => {
    const navigate = useNavigate();
    const [onSendLoading, setLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await editPasswordApi(user.id, data.password);
            reset();
        } catch (e) {
            notifications.show({
                title: e.response.data.detail,
                color: 'red',
            });
        }
        setLoading(false);
    };

    const onDelete = async () => {
        try {
            await deleteAccountApi(user.id);
            dispatch(userActions.logout());
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingOverlay visible={onSendLoading} />
            <Flex direction="column" gap={10}>
                <PasswordInput
                    label="Изменить пароль"
                    placeholder="Новый пароль"
                    error={errors.password?.message}
                    leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                    {...register('password', passwordValidation())}
                />

                <Button loading={onSendLoading} type="submit" fullWidth>
                    Сохранить
                </Button>

                <Button onClick={onDelete} type="button" color="red" fullWidth mt="xs">
                    Удалить аккаунт
                </Button>
            </Flex>
        </form>
    );
};
