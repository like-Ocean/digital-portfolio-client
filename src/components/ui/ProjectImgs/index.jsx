import { ActionIcon, Image, LoadingOverlay, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { getFile } from '../../../api/file/get-file.js';
import { IconTrash } from '@tabler/icons-react';
import style from './ProjectImgs.module.css';
import { useState } from 'react';
import { DeleteFileApi } from '../../../api/file/delete-file.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../../../store/reducers/project-slice.js';

export const ProjectImgs = ({ files, removable }) => {
    const param = useParams();

    const project = useSelector((state) => state.projects.projects);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    // возможно нужно удалить
    const handleImageLoad = () => {
        setLoading(false);
    };

    const onDelete = async (file_id) => {
        try {
            await DeleteFileApi(file_id, param.id);
            const updatedProject = project[0].files.filter((file) => file.file_id !== file_id);
            dispatch(projectActions.updateProject({ ...project[0], files: updatedProject }));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Stack align="center" gap="sm">
            {files &&
                files.map((file) => (
                    <div key={file.file_id} className={style.photo}>
                        <LoadingOverlay visible={loading} />
                        <Image
                            radius="md"
                            src={file ? getFile(file.file_id) : '/src/assets/9214833.jpg'}
                            onLoad={handleImageLoad}
                        />
                        {removable && (
                            <ActionIcon
                                variant="filled"
                                color="red"
                                radius="xl"
                                aria-label="delete"
                                className={style.remove}
                                onClick={() => onDelete(file.file_id)}
                            >
                                <IconTrash />
                            </ActionIcon>
                        )}
                    </div>
                ))}
        </Stack>
    );
};

ProjectImgs.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            file_id: PropTypes.string,
        }),
    ),
    removable: PropTypes.bool,
};
