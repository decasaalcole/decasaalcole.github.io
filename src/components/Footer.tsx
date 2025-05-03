import logo from '../assets/images/logo.png';
import './Footer.css';
export function Footer() {
    return (
        <>
        <div className="footer">
            <div className="footer_body">
                <img src={logo} alt="Decasaalcole logo" width="30" height="30" />
                <p>Decasaalcole</p>
            </div>
        </div>
        </>
    )
}
  