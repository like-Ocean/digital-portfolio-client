import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { router } from './router/index.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AuthRestore } from './components/ui/AuthRestore/index.jsx';
import { Notifications } from '@mantine/notifications';

function App() {
    return (
        <Provider store={store}>
            <MantineProvider>
                <Notifications />
                <AuthRestore>
                    <RouterProvider router={router} />
                </AuthRestore>
            </MantineProvider>
        </Provider>
    );
}

export default App;
