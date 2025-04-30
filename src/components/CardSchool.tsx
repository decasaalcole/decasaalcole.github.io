import { buildAddress } from "../helpers/school.helper";
import { School } from "../types/types";
import Home from '../assets/icons/home.svg';
import Phone from '../assets/icons/phone.svg';
import { CardBtn } from '../components/CardBtn';
import './CardSchool.css';
export function CardSchool({ school }: { school: School }) {

    const handleCall = () => {
        window.open(`tel:${school.Telefono}`, '_blank');
    }

    const handleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${school.lat},${school.long}`, '_blank');
    }

    const handleMoreInfo = () => {
        window.open(`https://ceice.gva.es/es/web/centros-docentes/consulta-general?viewUrl162652993=/abc/i_guiadecentros/es/centro.asp&codi=${school.Codigo}`, '_blank');
    }

    return (
        <div className="card-school">
            <div className="card-school-header">
                <p className="code">{school.Codigo}</p>
                <div className="distance">
                    <p className="time">20 min</p>
                    <p className="km">1 km</p>
                </div>
            </div>
            <div className="card-school-body">
                <p className="title">{school.Denominacion_Especifica}</p>
                <p className="subtitle">{school.Denominacion_Generica_VAL}</p>
                <div className="address">
                    <img src={Home} alt="Home" />
                    <p>{buildAddress(school)}</p>
                </div>
                {school.Telefono && school.Telefono.toString().trim() !== '' && (
                    <div className="phone">
                        <img src={Phone} alt="Phone" />
                        <p>{school.Telefono}</p>
                    </div>
                )}
            </div>
            <div className="card-school-footer">
                {school.Telefono && school.Telefono.toString().trim() !== '' && (
                    <CardBtn text="Llamar" action={handleCall} />
                )}
                <CardBtn text="Mapa" action={handleMap} />
                <CardBtn text="Más Info" action={handleMoreInfo} />
            </div>
        </div>
    )
}