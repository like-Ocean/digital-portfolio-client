import { Layout } from '../components/ui/Layout/index.jsx';
import { Flex, Card, LoadingOverlay, Stack } from '@mantine/core';
import { ProjectInfo } from '../components/ui/ProjectInfo/index.jsx';
import { ProjectImgs } from '../components/ui/ProjectImgs/index.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectByIdApi } from '../api/projects/get-project-by-id.js';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from '../store/reducers/project-slice.js';
import { ProjectComments } from '../components/ui/ProjectComments/index.jsx';
import { useCommentsByProjectId } from '../hooks/useCommentsByProjectId.js';
import { AddCommentForm } from '../components/forms/AddCommentForm/index.jsx';
import { commentActions } from '../store/reducers/comment-slice.js';

export const InnerProject = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user.user);

    const project = useSelector((state) =>
        state.projects.projects.find((p) => p.id.toString() === params.id),
    );

    const [loading, setLoading] = useState(true);

    const comments = useSelector((state) => state.comments.comments);
    const { commentsLoading } = useCommentsByProjectId(params.id);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getProjectByIdApi(params.id);
                dispatch(projectActions.setProjects([res.data]));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        void fetch();
    }, [params.id, dispatch]);

    const onCommentSubmit = (newComment) => {
        dispatch(commentActions.addComment(newComment));
    };

    return (
        <Layout>
            <Flex align="center" justify="center">
                <Card shadow="sm" radius="md" withBorder w={1000}>
                    <Stack gap="lg">
                        <div>
                            <LoadingOverlay visible={loading} />
                            {project && <ProjectImgs files={project.files} removable={false} />}
                        </div>

                        <div>
                            <LoadingOverlay visible={loading} />
                            {project && <ProjectInfo project={project} />}
                        </div>

                        <div>
                            <LoadingOverlay visible={commentsLoading} />
                            <ProjectComments comments={comments} />
                        </div>

                        {userState.id && <AddCommentForm onCommentSubmit={onCommentSubmit} />}
                    </Stack>
                </Card>
            </Flex>
        </Layout>
    );
};
