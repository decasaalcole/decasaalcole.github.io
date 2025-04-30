import logo from '../assets/images/logo.png';
import './Header.css';
export function Header() {
    return (
        <>
        <div className="header">
            <div className="header_logo">
                <img src={logo} alt="Decasaalcole logo" width="80" height="80" />
            </div>
            <h1>Decasaalcole</h1>
            <h3>Herramienta de cálculo de tiempos de viaje desde tu casa, a todos los centros educativos de la Comunitat Valenciana</h3>
        </div>
        </>
    )
}
  