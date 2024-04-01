import { Button, Card, Flex, Group, Text } from '@mantine/core';
import AuthorizationForm from '../components/forms/AuthorizationForm/index.jsx';
import { useNavigate } from 'react-router-dom';

export function Authorization() {
    const navigate = useNavigate();

    return (
        <Flex
            direction={{ sm: 'column' }}
            justify={{ sm: 'center' }}
            align={{ sm: 'center' }}
            style={{ height: '100vh' }}
        >
            <Card style={{ width: 450 }} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Text fw={500}>Вход в аккаунт</Text>
                        <Button variant="light" onClick={() => navigate('/registration')}>
                            Регистрация
                        </Button>
                    </Group>
                </Card.Section>

                <Card.Section mt="sm" mb="sm" inheritPadding>
                    <AuthorizationForm />
                </Card.Section>
            </Card>
        </Flex>
    );
}
