import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons'

interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
    return (
      <nav className="navbar">
        <div className="navbar__logo">MyApp</div>
        <ul className="navbar__links">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/home">
                  <FontAwesomeIcon icon={faHouse} />
                    <span className="navbar__links-name">Dashboard</span>
                </Link>
              </li>
                  <li>
                  <Link to="/profile">
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span className="navbar__links-name"><span className="navbar__links-name">Profile</span></span>
                  </Link>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
};

export default Navbar;
