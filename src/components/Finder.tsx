import './Finder.css';
import Counter1 from '../assets/icons/counter_1.svg';
import Counter2 from '../assets/icons/counter_2.svg';
import Counter3 from '../assets/icons/counter_3.svg';
import Counter4 from '../assets/icons/counter_4.svg';
import Counter5 from '../assets/icons/counter_5.svg';
import { FinderProps, SchoolRegimen, SchoolType, SchoolDayType, Province } from '../types/types';
import { Btn } from './Btn';
export function Finder({ zipCode, setZipCode, regimens, setRegimen, types, setType, dayTypes, setDayTypes, provinces, setProvinces }: FinderProps) {

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(Number(e.target.value));
    }

    return (
        <>
        <section className="finder">
            <div className="step">
                <div className="title">
                <img src={Counter1} alt="" />
                <span>Introduce el código postal donde resides</span>
                </div>
                <div className="input">
                <input type="number" placeholder="46113" value={zipCode} onChange={handleZipCodeChange} />
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter2} alt="" />
                <span>Selecciona el régimen del centro</span>
                </div>
                <div className="btns">
                    <Btn text="Público" value={SchoolRegimen.Public} selected={regimens.includes(SchoolRegimen.Public)} setSelected={setRegimen}/>
                    <Btn text="Privado" value={SchoolRegimen.Private} selected={regimens.includes(SchoolRegimen.Private)} setSelected={setRegimen}/>
                    <Btn text="Priv. concertado" value={SchoolRegimen.PrivateConc} selected={regimens.includes(SchoolRegimen.PrivateConc)} setSelected={setRegimen}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter3} alt="" />
                <span>Selecciona el tipo del centro</span>
                </div>
                <div className="btns">
                    <Btn text="Infantil" value={SchoolType.Infantil} selected={types.includes(SchoolType.Infantil)} setSelected={setType}/>
                    <Btn text="Primaria" value={SchoolType.Primaria} selected={types.includes(SchoolType.Primaria)} setSelected={setType}/>
                    <Btn text="Especial" value={SchoolType.Especial} selected={types.includes(SchoolType.Especial)} setSelected={setType}/>
                    <Btn text="C.R.A." value={SchoolType.CRA} selected={types.includes(SchoolType.CRA)} setSelected={setType}/>
                </div>
                <div className="btns">
                    <Btn text="E.S.O." value={SchoolType.ESO} selected={types.includes(SchoolType.ESO)} setSelected={setType}/>
                    <Btn text="Bachillerato" value={SchoolType.Bachillerato} selected={types.includes(SchoolType.Bachillerato)} setSelected={setType}/>
                    <Btn text="FP" value={SchoolType.FP} selected={types.includes(SchoolType.FP)} setSelected={setType}/>
                    <Btn text="Adultos" value={SchoolType.Adultos} selected={types.includes(SchoolType.Adultos)} setSelected={setType}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter4} alt="" />
                <span>Selecciona el tipo de jornada </span>
                </div>
                <div className="btns">
                    <Btn text="Continua" value={SchoolDayType.Continue} selected={dayTypes.includes(SchoolDayType.Continue)} setSelected={setDayTypes}/>
                    <Btn text="Partida" value={SchoolDayType.Splitted} selected={dayTypes.includes(SchoolDayType.Splitted)} setSelected={setDayTypes}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter5} alt="" />
                <span>Selecciona la provincia</span>
                </div>
                <div className="btns">
                    <Btn text="Castellón" value={Province.Castellon} selected={provinces.includes(Province.Castellon)} setSelected={setProvinces}/>
                    <Btn text="Valencia" value={Province.Valencia} selected={provinces.includes(Province.Valencia)} setSelected={setProvinces}/>
                    <Btn text="Alicante" value={Province.Alicante} selected={provinces.includes(Province.Alicante)} setSelected={setProvinces}/>
                </div>
            </div>
        </section>
        </>
    )
}