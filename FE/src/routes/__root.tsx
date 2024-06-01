import { createRootRoute, Outlet } from '@tanstack/react-router';
import '../App.css';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export const Route = createRootRoute({
  component: () => (
    <div id="main-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
});
