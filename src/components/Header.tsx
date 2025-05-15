import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import './Header.css';

export function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const title = "Decasaalcole";
    const subtitle = "Herramienta de cálculo de tiempos de viaje desde tu casa, a todos los centros educativos de la Comunitat Valenciana";
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="header">
            <div className={isMobile ? "header_top" : ""}>
                <div className="header_logo">
                    <img 
                        src={logo} 
                        alt="Decasaalcole logo" 
                        width={isMobile ? "50" : "80"} 
                        height={isMobile ? "50" : "80"} 
                    />
                </div>
                <h1>{title}</h1>
            </div>
            <h3>{subtitle}</h3>
        </div>
    );
}
  