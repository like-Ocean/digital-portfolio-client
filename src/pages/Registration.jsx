import { Button, Card, Flex, Group, Text } from '@mantine/core';
import RegistrationForm from '../components/forms/RegistrationForm/index.jsx';
import { useNavigate } from 'react-router-dom';

export function Registration() {
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
                        <Text fw={500}>Регистрация</Text>
                        <Button variant="light" onClick={() => navigate('/authorization')}>
                            Уже есть аккаунт
                        </Button>
                    </Group>
                </Card.Section>

                <Card.Section mt="sm" mb="sm" inheritPadding>
                    <RegistrationForm />
                </Card.Section>
            </Card>
        </Flex>
    );
}
