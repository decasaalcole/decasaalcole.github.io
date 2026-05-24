import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';

export function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [isScrolled, setIsScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isCompact = (isScrolled && !isMobile) || pathname === '/mapa';

    return (
        <div className={`header${isCompact ? ' header--compact' : ''}`}>
            <div className={isMobile ? "header_top" : ""}>
                <div className="header_logo">
                    <img
                        src={logo}
                        alt="Decasaalcole logo"
                        width={isMobile ? "50" : "80"}
                        height={isMobile ? "50" : "80"}
                    />
                </div>
                <h1>Decasaalcole</h1>
            </div>
            <h3>Herramienta de cálculo de tiempos de viaje desde tu casa, a todos los centros educativos de la Comunitat Valenciana</h3>
        </div>
    );
}
