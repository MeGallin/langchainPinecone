import { createLazyFileRoute } from '@tanstack/react-router';
import QueryView from '../views/query/QueryView';

export const Route = createLazyFileRoute('/query')({
  component: () => (
    <>
      <QueryView />
    </>
  ),
});
