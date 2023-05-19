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
            <h3>Logo</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">My work</a>
                <a href="/#">Blog</a>
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