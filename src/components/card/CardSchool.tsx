import { buildAddress } from "../../helpers/school.helper";
import { School, SchoolLevel } from "../../types/types";
import Home from '../../assets/icons/home.svg';
import Phone from '../../assets/icons/phone.svg';
import Schedule from '../../assets/icons/schedule.svg';
import Education from '../../assets/icons/education.svg';
import Car from '../../assets/icons/car.svg';
import { CardBtn } from '../btns/CardBtn';
import './CardSchool.css';

export function moreInfo(codigo: string): string {
    return `https://ceice.gva.es/es/web/centros-docentes/consulta-general?viewUrl162652993=/abc/i_guiadecentros/es/centro.asp&codi=${codigo}`
}

export function CardSchool({ school }: { school: School }) {

    const handleCall = () => {
        window.open(`tel:${school.tel}`, '_blank');
    }

    const handleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${school.lat},${school.long}`, '_blank');
    }

    const handleMoreInfo = () => {
        window.open(moreInfo(school.codigo), '_blank');
    }

    return (
        <div className="card-school">
            <div className="card-school-header">
                <div className="code-regimen">
                    <p className="num">{school.num}</p>
                    <p className="code">{school.codigo}</p>
                    <p className="regimen">{school.reg}</p>
                    {school.cra && <p className="cra">CRA</p>}
                    {school.caes && <p className="caes">CAES</p>}
                </div>
                <div className="distance">
                    <div className="car">
                        <img src={Car} alt="Car" />
                    </div>
                    <div className="time">
                        <div>{school.time === 0 ? '5' : `${school.time}`}</div>
                        <div className="units">min</div>
                    </div>
                    <div className="km">
                        <div>{school.dist === 0 ? 'Cerca' : `${school.dist}`}</div>
                        <div className="units">{school.dist === 0 ? '' : 'km'}</div>
                    </div>
                </div>
            </div>
            <div className="card-school-body">
                <p className="title">{school.deno}</p>
                <div className="address">
                    <img src={Home} alt="Home" />
                    <p>{buildAddress(school)}</p>
                </div>
                {school.tel && school.tel.toString().trim() !== '' && (
                    <div className="phone">
                        <img src={Phone} alt="Phone" />
                        <p>{school.tel}</p>
                    </div>
                )}
                <div className="schedule">
                    <img src={Schedule} alt="Schedule" />
                    <p>{school.horario.join(' | ')}</p>
                </div>
                {school.niveles && (
                    <div className="education">
                        <img src={Education} alt="Education" />
                        <div className="education-levels">
                            {school.niveles.map((nivel: SchoolLevel) => (
                                <p key={nivel.nivel}>{nivel.nivel}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="card-school-footer">
                {school.tel && school.tel.toString().trim() !== '' && (
                    <CardBtn text="Llamar" action={handleCall} />
                )}
                <CardBtn text="Mapa" action={handleMap} />
                <CardBtn text="Más Info" action={handleMoreInfo} />
            </div>
        </div>
    )
}
