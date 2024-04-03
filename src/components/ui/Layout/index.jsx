import { AppShell, Button, Group } from '@mantine/core';
import { IconHome, IconUserCircle } from '@tabler/icons-react';
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
    return (
        <AppShell header={{ height: 50 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="flex-end" style={{ flex: 1 }}>
                        <Group ml="xl" gap={0}>
                            <Button variant="subtle" leftSection={<IconHome size={20} />}>
                                Главная
                            </Button>
                            <Button variant="subtle" leftSection={<IconUserCircle size={20} />}>
                                Профиль
                            </Button>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};
