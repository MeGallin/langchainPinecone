import { createLazyFileRoute } from '@tanstack/react-router';
import AboutView from '../views/about/AboutView';

export const Route = createLazyFileRoute('/about')({
  component: () => (
    <>
      <AboutView />
    </>
  ),
});
