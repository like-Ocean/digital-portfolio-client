import {
    Button,
    FileInput,
    Flex,
    Grid,
    LoadingOverlay,
    NativeSelect,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useCategories } from '../../../hooks/useCategories.js';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectImgs } from '../../ui/ProjectImgs/index.jsx';
import { editProjectInfoApi } from '../../../api/projects/edit-project-info.js';
import { projectActions } from '../../../store/reducers/project-slice.js';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProjectApi } from '../../../api/projects/delete-project.js';
import { projectUploadFileApi } from '../../../api/projects/create-project-upload-file.js';
import { useState } from 'react';

export const EditProjectForm = () => {
    const navigate = useNavigate();
    const [onSendLoading, setLoading] = useState(false);

    const params = useParams();
    const user = useSelector((state) => state.user.user);

    const { categories, loading } = useCategories();

    const project = useSelector((state) => state.projects.projects);
    const dispatch = useDispatch();

    const { handleSubmit, register, control } = useForm({
        defaultValues: {
            name: project[0].name,
            description: project[0].description,
        },
    });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await editProjectInfoApi(
                project[0].id,
                data.name,
                data.description,
                data.category,
            );

            let updatedProject = { ...res.data };

            const filesArray = Array.from(data.files);
            if (filesArray.length > 0) {
                const formData = new FormData();
                filesArray.forEach((file) => {
                    formData.append('files', file);
                });
                formData.append('project_id', project[0].id);
                const file_res = await projectUploadFileApi(formData);

                updatedProject = {
                    ...updatedProject,
                    files: [...updatedProject.files, ...file_res.data.files],
                };
            }

            dispatch(projectActions.updateProject(updatedProject));
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const onDelete = async () => {
        try {
            await deleteProjectApi(params.id, user.id);
            navigate(`/profile/${user.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingOverlay visible={onSendLoading} />
            <Grid>
                <Grid.Col span={6}>
                    <ProjectImgs files={project[0].files} removable={true} />
                </Grid.Col>

                <Grid.Col span={6}>
                    <Flex direction="column" gap={10}>
                        <TextInput label="Название" {...register('name')} />
                        <Textarea resize="vertical" label="Описание" {...register('description')} />

                        <LoadingOverlay visible={loading} />
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={project[0].category.id}
                            render={({ field }) => (
                                <NativeSelect label="Категория" data={categories} {...field} />
                            )}
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
                        <Button
                            type="submit"
                            loading={onSendLoading}
                            color="blue"
                            fullWidth
                            radius="md"
                        >
                            Сохранить
                        </Button>

                        <Button onClick={onDelete} type="button" color="red" fullWidth radius="md">
                            Удалить проект
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </form>
    );
};
