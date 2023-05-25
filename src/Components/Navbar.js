import { useRef } from "react";
import {FaBars,FaTimes} from "react-icons/fa"
import "../Styles/main.css"

function Navbar() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }


    return (
        <header>
            <h3>SuperHeroMap</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/Incident">Incident</a>
                <a href="/Hero">Hero</a>
                <a href="/#">About Me</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button onClick={showNavbar} className="nav-btn">
                <FaBars/>   
            </button>
        </header>
    );
}

export default Navbar;