import { RouterProvider, createRouter } from '@tanstack/react-router';
import { rootRoute, indexRoute, logsRoute } from './routes';

const routeTree = rootRoute.addChildren([indexRoute, logsRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;