import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Registration } from '../pages/Registration.jsx';
import { Authorization } from '../pages/Authorization.jsx';
import { AuthNonRequired } from './AuthNonRequired.jsx';
import { AuthRequired } from './AuthRequired.jsx';
import { UserProfile } from '../pages/UserProfile.jsx';
import { Home } from '../pages/Home.jsx';
import {ProjectId} from "../pages/ProjectId.jsx";

export const router = createBrowserRouter([
    {
        element: <AuthNonRequired />,
        children: [
            {
                path: '/registration',
                element: <Registration />,
            },
            {
                path: '/authorization',
                element: <Authorization />,
            },
        ],
    },

    {
        element: <AuthRequired />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
    },

    {
        path: '/profile',
        element: <UserProfile />,
    },
    {
        path: '/project/:id',
        element: <ProjectId />,
    },
    {
        path: '/*',
        element: <Navigate to="/" />,
    },
]);
