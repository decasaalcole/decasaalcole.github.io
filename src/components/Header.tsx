import logo from '../assets/images/logo.png';
import './Header.css';
export function Header() {

    const title = "Decasaalcole";
    const subtitle = "Herramienta de cálculo de tiempos de viaje desde tu casa, a todos los centros educativos de la Comunitat Valenciana";
    
    return (
        <>
        {window.innerWidth < 700 ? (
            <div className="header">
                <div className="header_top">
                    <div className="header_logo">
                        <img src={logo} alt="Decasaalcole logo" width="50" height="50" />
                    </div>
                    <h1>{title}</h1>
                </div>
                <h3>{ subtitle }</h3>
            </div>
        ) : (
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="Decasaalcole logo" width="80" height="80" />
                </div>
                <h1>{ title }</h1>
                <h3>{ subtitle }</h3>
            </div>
        )}
        </>
    )
}
  