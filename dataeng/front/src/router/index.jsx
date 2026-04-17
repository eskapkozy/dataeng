import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Page imports (entry points)
import Home from '../pages/Home';
import Community from '../pages/Community';
import Members from '../pages/Members';
import Write from '../pages/Write';
import SignIn from '../pages/SignIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'members',
        element: <Members />,
      },
      {
        path: 'write',
        element: <Write />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
]);
