import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCircleUser, faCircleChevronRight} from '@fortawesome/free-solid-svg-icons'

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
                    <span className="navbar__links-name">Profile</span>
                  </Link>
              </li>
              <li>
                  <FontAwesomeIcon icon={faCircleChevronRight}/>
                  <span onClick={onLogout} className="navbar__links-name">Logout</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FontAwesomeIcon icon={faCircleUser} />
                  <span onClick={onLogout} className="navbar__links-name">Login</span>
              </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
};

export default Navbar;
