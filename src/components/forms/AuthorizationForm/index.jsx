import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { passwordValidation, requiredValidation } from '../../../constants/validation.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authorizationApi } from "../../../api/users/authorization.js";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActions} from "../../../store/reducers/user-slice.js";

const AuthorizationForm = () => {
    const dispatch = useDispatch()
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
            const res = await authorizationApi(
              data.login,
              data.password
            );
            dispatch(userActions.login(res.data))
            navigate('/some');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
                <TextInput
                    label="Логин"
                    radius="xs"
                    error={errors.login?.message}
                    {...register('login', requiredValidation())}
                />
                <PasswordInput
                    label="Пароль"
                    radius="xs"
                    error={errors.login?.message}
                    {...register('password', passwordValidation())}
                />
            </Flex>

            <Button
                type="submit"
                loading={loading}
                color="blue"
                fullWidth
                mt="md"
                radius="md"
            >
                Войти
            </Button>
        </form>
    );
};

export default AuthorizationForm;
