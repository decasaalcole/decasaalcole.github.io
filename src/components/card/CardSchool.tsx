import { buildAddress } from "../../helpers/school.helper";
import { School, SchoolLevel } from "../../types/types";
import Home from '../../assets/icons/home.svg';
import Phone from '../../assets/icons/phone.svg';
import Schedule from '../../assets/icons/schedule.svg';
import Education from '../../assets/icons/education.svg';
import Car from '../../assets/icons/car.svg';
import { CardBtn } from '../btns/CardBtn';
import './CardSchool.css';
export function CardSchool({ school }: { school: School }) {

    const handleCall = () => {
        window.open(`tel:${school.telefono}`, '_blank');
    }

    const handleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${school.lat},${school.long}`, '_blank');
    }

    const handleMoreInfo = () => {
        window.open(`https://ceice.gva.es/es/web/centros-docentes/consulta-general?viewUrl162652993=/abc/i_guiadecentros/es/centro.asp&codi=${school.codigo}`, '_blank');
    }

    return (
        <div className="card-school">
            <div className="card-school-header">
                <div className="code-regimen">
                    <p className="code">{school.codigo}</p>
                    <p className="regimen">{school.regimen === 'PrivConc' ? 'Conc' : school.regimen}</p>
                    {school.cra && <p className="cra">CRA</p>}
                    {school.caes && <p className="cae">CAES</p>}
                </div>                
                <div className="distance">
                    <div className="car">
                        <img src={Car} alt="Car" />
                    </div>
                    <p className="time">{school.time === 0 ? '1 min' : `${school.time + 2} min`}</p>
                    <p className="km">{school.dist === 0 ? 'En tu CP' : `${school.dist} km`}</p>
                </div>
            </div>
            <div className="card-school-body">
                <p className="title">{school.denEspec}</p>
                <p className="subtitle">{school.denGenVal}</p>
                <div className="address">
                    <img src={Home} alt="Home" />
                    <p>{buildAddress(school)}</p>
                </div>
                {school.telefono && school.telefono.toString().trim() !== '' && (
                    <div className="phone">
                        <img src={Phone} alt="Phone" />
                        <p>{school.telefono}</p>
                    </div>
                )}                
                <div className="schedule">
                    <img src={Schedule} alt="Schedule" />
                    <p>{school.horario}</p>
                </div> 
                <div className="education">
                    <img src={Education} alt="Education" />
                    <div className="education-levels">
                        {school.niveles_autorizados.map((nivel: SchoolLevel) => (
                            <p key={nivel.nivel}>{nivel.nivel}</p>
                        ))}
                    </div>
                </div>                
            </div>
            <div className="card-school-footer">
                {school.telefono && school.telefono.toString().trim() !== '' && (
                    <CardBtn text="Llamar" action={handleCall} />
                )}
                <CardBtn text="Mapa" action={handleMap} />
                <CardBtn text="Más Info" action={handleMoreInfo} />
            </div>
        </div>
    )
}