import PropTypes from 'prop-types';
import { Button, Stack, Text } from '@mantine/core';
import { Comment } from '../Comment/index.jsx';
import { useState } from 'react';

const OFFSET = 5;

export const ProjectComments = ({ comments }) => {
    const [count, setCount] = useState(OFFSET);

    const onLoadMore = () => {
        setCount((prev) => prev + OFFSET);
    };

    return (
        <Stack gap={10}>
            <Text size="md" fw={500}>
                Комментарии:
            </Text>

            <Stack>
                {comments.slice(0, count).map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </Stack>

            {comments.length > count && (
                <Button variant="subtle" onClick={onLoadMore}>
                    Загрузить еще
                </Button>
            )}
        </Stack>
    );
};

ProjectComments.propTypes = {
    comments: PropTypes.arrayOf({
        id: PropTypes.number,
        comment: PropTypes.string,
        post_date: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            first_name: PropTypes.string,
            surname: PropTypes.string,
        }),
    }),
};
