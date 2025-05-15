import logo from '../assets/images/logo.png';
import './Footer.css';

export function Footer() {
    const appName = "Decasaalcole";
    
    return (
        <footer className="footer">
            <div className="footer_body">
                <img 
                    src={logo} 
                    alt={`${appName} logo`}
                    width={30} 
                    height={30}
                />
                <p>{appName}</p>
            </div>
        </footer>
    );
}
  