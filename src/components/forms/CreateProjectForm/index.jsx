import {
    Button,
    FileInput,
    Flex,
    LoadingOverlay,
    NativeSelect,
    Textarea,
    TextInput,
} from '@mantine/core';
import { requiredValidation } from '../../../constants/validation.js';
import { Controller, useForm } from 'react-hook-form';
import { createProjectApi } from '../../../api/projects/create-project.js';
import { projectUploadFileApi } from '../../../api/projects/create-project-upload-file.js';
import { useCategories } from '../../../hooks/useCategories.js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../../../store/reducers/project-slice.js';
import { notifications } from '@mantine/notifications';

export const CreateProjectForm = () => {
    const dispatch = useDispatch();

    const { categories, loading } = useCategories();
    const [isLoading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm();
    const userState = useSelector((state) => state.user.user);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const projectResponse = await createProjectApi(
                userState.id,
                data.name,
                data.description,
                data.category,
            );

            const projectId = projectResponse.data.id;

            const filesArray = Array.from(data.files);
            const formData = new FormData();

            filesArray.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('project_id', projectId);

            const res = await projectUploadFileApi(formData);
            dispatch(projectActions.createProject(res.data));

            reset();
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
            <LoadingOverlay visible={isLoading} />
            <Flex direction="column" gap={10}>
                <TextInput
                    label="Название"
                    error={errors.name?.message}
                    {...register('name', requiredValidation())}
                />

                <Textarea
                    resize="vertical"
                    label="Описание"
                    error={errors.description?.message}
                    {...register('description')}
                />

                <LoadingOverlay visible={loading} />
                <NativeSelect
                    label="Категория"
                    data={categories}
                    error={errors.category?.message}
                    {...register('category', requiredValidation())}
                />

                <Controller
                    name="files"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: 'Необходимо выбрать файл' }}
                    render={({ field: { onChange, value, ...field } }) => (
                        <FileInput
                            {...field}
                            label="Изображения"
                            placeholder="Выберите файлы"
                            multiple
                            accept="image/*"
                            error={errors.files?.message}
                            value={value}
                            onChange={(files) => {
                                onChange(files);
                            }}
                        />
                    )}
                />
            </Flex>

            <Button type="submit" color="blue" fullWidth mt="md">
                Создать
            </Button>
        </form>
    );
};
