import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Button} from './Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
const logo = require('../../Logo/dsckiit_logo_colour.svg');


function Nabvar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
    showButton();
    }, []);

    window.addEventListener('resize', showButton);


    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                        <img src={logo} alt="dsc" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                    {
                        click ? <FaTimes /> : <FaBars />
                    }
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/compete' className="nav-links" onClick={closeMobileMenu}>
                                Compete/Practice
                            </Link>
                        </li>
                        <li className="nav-btn">
                        { button ? (
                            <Link to='/register' className="btn-link">
                                <Button buttonStyle='btn--outline'>REGISTER</Button>
                            </Link>
                        ): (
                            <Link to='/register' className="btn-link" onClick={closeMobileMenu}>
                                <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>REGISTER</Button>
                            </Link>
                        ) }
                        </li>
                        <li className="nav-btn">
                        { button ? (
                            <Link to='/login' className="btn-link">
                                <Button buttonStyle='btn--outline'>LOGIN</Button>
                            </Link>
                        ): (
                            <Link to='/login' className="btn-link" onClick={closeMobileMenu}>
                                <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>LOGIN</Button>
                            </Link>
                        ) }
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default Nabvar;
