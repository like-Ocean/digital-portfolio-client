import { Card, Grid } from '@mantine/core';
import { EditUserPasswordAndDeleteAccountForm } from '../../forms/EditUserPasswordAndDeleteAccountForm/index.jsx';

export const PrivacyTab = () => {
    return (
        <Grid mt={10}>
            <Grid.Col span={4}>
                <Card withBorder padding="xs">
                    <EditUserPasswordAndDeleteAccountForm />
                </Card>
            </Grid.Col>
        </Grid>
    );
};
