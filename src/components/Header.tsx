import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';

export function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [isOutOfView, setIsOutOfView] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();
    const isMapRoute = pathname === '/mapa';

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Show the floating compact bar once the full header has scrolled out of view.
    // The full header never changes size, so the page layout (and scroll position) stays stable.
    useEffect(() => {
        if (!headerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => setIsOutOfView(!entry.isIntersecting));
        observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, [isMapRoute]);

    if (isMapRoute) {
        return (
            <div className="header header--compact">
                <div>
                    <div className="header_logo">
                        <img src={logo} alt="Decasaalcole logo" width="26" height="26" />
                    </div>
                    <h1>Decasaalcole</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <div ref={headerRef} className="header">
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
            {!isMobile && (
                <div
                    className={`header header--compact header--floating${isOutOfView ? ' header--visible' : ''}`}
                    aria-hidden="true"
                >
                    <div>
                        <div className="header_logo">
                            <img src={logo} alt="" width="26" height="26" />
                        </div>
                        <span className="header_title">Decasaalcole</span>
                    </div>
                </div>
            )}
        </>
    );
}
