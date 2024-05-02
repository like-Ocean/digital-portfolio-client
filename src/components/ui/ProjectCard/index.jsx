import { Card, Flex, Image, Rating, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { getFile } from '../../../api/file/get-file.js';
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({ project }) => {
    const router = useNavigate();

    return (
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

            <Flex justify="space-between">
                <div>
                    <Text fw={500} size="lg" mt="xs">
                        {project.name}
                    </Text>
                    <Text c="dimmed" size="sm">
                        Автор: {project.user.login}
                    </Text>
                </div>

                <Flex align="center" gap={5}>
                    <Text fw={500} size="md">
                        {project.average_grade ? project.average_grade.toFixed(1) : ''}
                    </Text>

                    <Rating count={1} size="md" value={project.average_grade ? 1 : 0} readOnly />
                </Flex>
            </Flex>
        </Card>
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
        user: PropTypes.shape({
            login: PropTypes.string,
        }),
        average_grade: PropTypes.number,
    }),
};
