import { createFileRoute } from '@tanstack/react-router';
import LoginView from '../views/login/LoginView';

export const Route = createFileRoute('/login')({
  component: () => (
    <div>
      <LoginView />
    </div>
  ),
});
