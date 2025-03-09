import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar__logo">MediSync</h1>
            <ul className="navbar__links">
                <li><Link to="/dashboard"><FontAwesomeIcon icon={faHouse} /><span className="navbar__links-name">My Dashboard</span></Link></li>
                <li><Link to="/profile"><FontAwesomeIcon icon={faCircleUser} /><span className="navbar__links-name">Profile</span></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar