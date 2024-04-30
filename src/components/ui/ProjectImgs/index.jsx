import { ActionIcon, BackgroundImage, Image, LoadingOverlay } from '@mantine/core';
import PropTypes from 'prop-types';
import { getFile } from '../../../api/file/get-file.js';
import { IconTrash } from '@tabler/icons-react';
import style from './ProjectImgs.module.css';
import { useState } from 'react';
import { DeleteFileApi } from '../../../api/file/delete-file.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../../../store/reducers/project-slice.js';
import { Carousel } from '@mantine/carousel';

export const ProjectImgs = ({ files, removable }) => {
    const param = useParams();

    const project = useSelector((state) => state.projects.projects);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

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
        <Carousel withIndicators w="100%" height={500} loop>
            {files?.map((file) => (
                <Carousel.Slide key={file.file_id} className={style.photo}>
                    <BackgroundImage
                        src={file ? getFile(file.file_id) : '/src/assets/9214833.jpg'}
                        h="100%"
                    >
                        <div className={style.image}>
                            <LoadingOverlay visible={loading} />

                            <Image
                                src={file ? getFile(file.file_id) : '/src/assets/9214833.jpg'}
                                onLoad={() => setLoading(false)}
                                fit="contain"
                                h="100%"
                            />
                        </div>

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
                    </BackgroundImage>
                </Carousel.Slide>
            ))}
        </Carousel>
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
