import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Registration } from '../pages/Registration.jsx';
import { Authorization } from '../pages/Authorization.jsx';
import { AuthNonRequired } from './AuthNonRequired.jsx';
import { AuthRequired } from './AuthRequired.jsx';
import {UserProfile} from "../pages/UserProfile.jsx";

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
                element: 'home Page',
            }
        ],
    },

    {
        path: '/profile',
        element: <UserProfile />,
    },
    {
        path: '/*',
        element: <Navigate to="/" />,
    },

]);
