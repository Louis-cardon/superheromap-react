import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom';
import "../Styles/main.css"

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }


    return (
        <header>
            <h3>
                <Link to="/" className="title-link">SuperHeroMap</Link>
            </h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/Incident">Incident</a>
                <a href="/Hero">Hero</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button onClick={showNavbar} className="nav-btn">
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;