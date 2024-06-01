import { Link } from '@tanstack/react-router';
import './Navigation.css';

const Navigation = () => {
  return (
    <>
      <Link to="/" activeProps={{ className: 'active' }}>
        Home
      </Link>
      <Link to="/query" activeProps={{ className: 'active' }}>
        Query
      </Link>
      <Link to="/about" activeProps={{ className: 'active' }}>
        About
      </Link>
      <Link to="/login" activeProps={{ className: 'active' }}>
        Login
      </Link>
    </>
  );
};

export default Navigation;
