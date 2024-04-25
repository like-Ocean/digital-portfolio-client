import { Button, Flex, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCertificateApi } from '../../../api/certificates/delete-certificate.js';
import { certificateActions } from '../../../store/reducers/certificate-slice.js';
import { editCertificateApi } from '../../../api/certificates/edit-certificate.js';
import { notifications } from '@mantine/notifications';

export const EditCertificateForm = () => {
    const navigate = useNavigate();
    const [onSendLoading, setLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const certificate = useSelector((state) => state.certificates.certificates);
    const dispatch = useDispatch();

    const { handleSubmit, register } = useForm({
        defaultValues: {
            name: certificate[0].name,
            company: certificate[0].company,
            link: certificate[0].link,
        },
    });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await editCertificateApi(
                user.id,
                certificate[0].id,
                data.name,
                data.company,
                data.link,
            );
            dispatch(certificateActions.updateCertificate(res.data));
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
            await deleteCertificateApi(user.id, certificate[0].id, certificate[0].file_id);
            navigate(`/profile/${user.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingOverlay visible={onSendLoading} />
            <Flex direction="column" gap={10}>
                <TextInput label="Название документа" {...register('name')} />
                <TextInput label="Компания" {...register('company')} />
                <TextInput label="Ссылка" {...register('link')} />
                <Button loading={onSendLoading} type="submit" color="blue" fullWidth mt="md">
                    Сохранить
                </Button>
                <Button onClick={onDelete} type="button" color="red" fullWidth>
                    Удалить
                </Button>
            </Flex>
        </form>
    );
};
