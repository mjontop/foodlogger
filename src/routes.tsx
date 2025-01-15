import { createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { FoodEntryForm } from './components/FoodEntryForm';
import { FoodLogTable } from './components/FoodLogTable';
import { Navigation } from './components/Navigation';

export const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  ),
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: FoodEntryForm,
});

export const logsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/logs',
  component: FoodLogTable,
});