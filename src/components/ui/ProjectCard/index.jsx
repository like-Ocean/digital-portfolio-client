import { Card, Grid, Image, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { getFile } from '../../../api/file/get-file.js';
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({ project }) => {
    const router = useNavigate();

    return (
        <Grid.Col span={4}>
            <Card
                onClick={() => router(`/project/${project.id}`)}
                withBorder
                padding="xs"
                style={{ cursor: 'pointer' }}
            >
                <Card.Section>
                    <Image
                        src={
                            project.files[0]
                                ? getFile(project.files[0].file_id)
                                : '/src/assets/9214833.jpg'
                        }
                        h={200}
                        style={{ objectFit: 'cover' }}
                    />
                </Card.Section>

                <Text fw={500} size="lg" mt="xs">
                    {project.name}
                </Text>
            </Card>
        </Grid.Col>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        files: PropTypes.arrayOf(
            PropTypes.shape({
                file_id: PropTypes.string,
            }),
        ),
        name: PropTypes.string,
        id: PropTypes.number,
    }),
};
