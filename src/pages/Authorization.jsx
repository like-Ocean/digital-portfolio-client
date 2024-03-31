import { Card, Flex } from '@mantine/core';
import AuthorizationForm from '../components/forms/AuthorizationForm/index.jsx';

export function Authorization() {
    return (
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
            align={{ sm: 'center' }}
            style={{ height: '100vh' }}
        >
            <Card style={{ width: 450 }} shadow="sm" padding="lg" radius="md" withBorder>
                <AuthorizationForm />
            </Card>
        </Flex>
    );
}
