import { Button, FileInput, Flex, LoadingOverlay, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { requiredValidation } from '../../../constants/validation.js';
import { addCertificateApi } from '../../../api/certificates/add-certificate.js';
import { useDispatch, useSelector } from 'react-redux';
import { certificateActions } from '../../../store/reducers/certificate-slice.js';
import { certificateUploadFileApi } from '../../../api/certificates/certificate-upload-file.js';

export const AddCertificateForm = () => {
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', data.files[0]);
            const file = await certificateUploadFileApi(formData);

            const res = await addCertificateApi(
                userState.id,
                data.name,
                data.company,
                data.link,
                file.data.file_id,
            );
            dispatch(certificateActions.createCertificate(res.data));

            reset();
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingOverlay visible={loading} />
            <Flex direction="column" gap={10}>
                <TextInput
                    // required="true"
                    label="Название"
                    error={errors.name?.message}
                    {...register('name', requiredValidation())}
                />

                <TextInput label="Компания" {...register('company')} />

                <TextInput label="Ссылка" {...register('link')} />

                {/*какой то прикол со свойством multiple*/}
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
                            accept="document/*"
                            error={errors.files?.message}
                            value={value}
                            onChange={(files) => {
                                onChange(files);
                            }}
                        />
                    )}
                />

                <Button type="submit" loading={loading} color="blue" fullWidth mt="md">
                    Добавить
                </Button>
            </Flex>
        </form>
    );
};
