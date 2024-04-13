import { Button, FileInput, Flex, LoadingOverlay, NativeSelect, Textarea, TextInput } from '@mantine/core';
import { requiredValidation } from '../../../constants/validation.js';
import {Controller, useForm} from 'react-hook-form';
import { createProjectApi } from '../../../api/projects/create-project.js';
import { createProjectUploadFileApi } from '../../../api/projects/create-project-upload-file.js';
import { useCategories } from '../../../hooks/useCategories.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const CreateProjectForm = () => {
    const { categories, loading } = useCategories();
    const [isLoading, setLoading] = useState(false);
    const { handleSubmit, register, formState: { errors }, reset, control } = useForm();
    const userState = useSelector((state) => state.user.user);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const projectResponse = await createProjectApi(
                userState.id,
                data.name,
                data.description,
                data.category
            );

            const projectId = projectResponse.data.id;
            const filesArray = Array.from(data.files)
            const formData = new FormData();

            filesArray.forEach((file) => {
                formData.append('files', file);
                console.log(file)
            });
            formData.append('project_id', projectId);

            await createProjectUploadFileApi(formData);
            reset();
        } catch (e) {
            console.log(e);
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
                    render={({ field: { onChange, value, ...field } }) => (
                        <FileInput
                            {...field}
                            label="Изображения"
                            placeholder="Выберите файлы"
                            multiple
                            accept="image/*"
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
