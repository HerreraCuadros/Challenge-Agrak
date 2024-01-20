import { createBrowserRouter, Navigate } from 'react-router-dom';
import { UserApp } from '../UserApp';

import { CreateView, EditView, HomeView,  } from '../users/views';

export const router = createBrowserRouter([
  {
    path: '/users',
    element: <UserApp />,
    children: [
        { path: 'home', element: <HomeView />,  },
        { path: 'create', element: <CreateView /> },
        { path: 'edit/:id', element: <EditView /> },
        { path: '*', element: <Navigate to="home" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="users/home" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);