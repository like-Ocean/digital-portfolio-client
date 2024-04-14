import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { sendCommentApi } from '../../../api/comments/send-comment.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { requiredValidation } from '../../../constants/validation.js';

export const AddCommentForm = ({ onCommentSubmit }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const user = useSelector((state) => state.user.user);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await sendCommentApi(user.id, params.id, data.comment);
            onCommentSubmit(res.data);
            reset();
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="sm">
                <TextInput
                    placeholder="Добавить комментарий"
                    error={errors.comment?.message}
                    {...register('comment', requiredValidation())}
                />
                <Button type="submit" loading={loading} variant="outline">
                    Отправить
                </Button>
            </Flex>
        </form>
    );
};

AddCommentForm.propTypes = {
    onCommentSubmit: PropTypes.func,
};
