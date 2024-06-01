import { createLazyFileRoute } from '@tanstack/react-router';
import HomeView from '../views/home/HomeView';

export const Route = createLazyFileRoute('/')({
  component: () => (
    <>
      <HomeView />
    </>
  ),
});
