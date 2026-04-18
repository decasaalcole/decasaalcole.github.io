import logo from '../assets/images/logo.png';
import './Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <img src={logo} alt="Decasaalcole logo" width={28} height={28} />
            <span>© {new Date().getFullYear()} Decasaalcole</span>
        </footer>
    );
}
