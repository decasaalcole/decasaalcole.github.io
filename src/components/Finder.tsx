import './Finder.css';
import Counter1 from '../assets/icons/counter_1.svg';
import Counter2 from '../assets/icons/counter_2.svg';
import Counter3 from '../assets/icons/counter_3.svg';
import Counter4 from '../assets/icons/counter_4.svg';
import Counter5 from '../assets/icons/counter_5.svg';
import Counter6 from '../assets/icons/counter_6.svg';
import { FinderProps, SchoolRegimenType, SchoolEducationType, SchoolDayType, Province, SchoolCenterType } from '../types/types';
import { Btn } from './btns/Btn';
export function Finder({ zipCode, setZipCode, regimenTypes, setRegimenTypes, educationTypes, setEducationTypes, dayTypes, setDayTypes, provinces, setProvinces, centerTypes, setCenterTypes }: FinderProps) {

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(Number(e.target.value));
    }

    return (
        <>
        
        <section className="finder">
            <h2>Selección de centros</h2>
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
                <span>Selecciona las provincias</span>
                </div>
                <div className="btns">
                    <Btn text="Castellón" value={Province.Castellon} selected={provinces.includes(Province.Castellon)} setSelected={setProvinces}/>
                    <Btn text="Valencia" value={Province.Valencia} selected={provinces.includes(Province.Valencia)} setSelected={setProvinces}/>
                    <Btn text="Alicante" value={Province.Alicante} selected={provinces.includes(Province.Alicante)} setSelected={setProvinces}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter3} alt="" />
                <span>Selecciona los régimenes de los centros</span>
                </div>
                <div className="btns">
                    <Btn text="Público" value={SchoolRegimenType.Public} selected={regimenTypes.includes(SchoolRegimenType.Public)} setSelected={setRegimenTypes}/>
                    <Btn text="Privado" value={SchoolRegimenType.Private} selected={regimenTypes.includes(SchoolRegimenType.Private)} setSelected={setRegimenTypes}/>
                    <Btn text="Priv. concertado" value={SchoolRegimenType.PrivateConc} selected={regimenTypes.includes(SchoolRegimenType.PrivateConc)} setSelected={setRegimenTypes}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter4} alt="" />
                <span>Selecciona los tipos de nivel educativo</span>
                </div>
                <div className="btns">
                    <Btn text="Infantil" value={SchoolEducationType.Infantil} selected={educationTypes.includes(SchoolEducationType.Infantil)} setSelected={setEducationTypes   }/>
                    <Btn text="Primaria" value={SchoolEducationType.Primaria} selected={educationTypes.includes(SchoolEducationType.Primaria)} setSelected={setEducationTypes}/>
                    <Btn text="Especial" value={SchoolEducationType.Especial} selected={educationTypes.includes(SchoolEducationType.Especial)} setSelected={setEducationTypes}/>
                </div>
                <div className="btns">
                    <Btn text="E.S.O." value={SchoolEducationType.ESO} selected={educationTypes.includes(SchoolEducationType.ESO)} setSelected={setEducationTypes}/>
                    <Btn text="Bachillerato" value={SchoolEducationType.Bachillerato} selected={educationTypes.includes(SchoolEducationType.Bachillerato)} setSelected={setEducationTypes}/>
                    <Btn text="FP" value={SchoolEducationType.FP} selected={educationTypes.includes(SchoolEducationType.FP)} setSelected={setEducationTypes}/>
                    <Btn text="Adultos" value={SchoolEducationType.Adultos} selected={educationTypes.includes(SchoolEducationType.Adultos)} setSelected={setEducationTypes}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter5} alt="" />
                <span>Selecciona los tipos de jornada </span>
                </div>
                <div className="btns">
                    <Btn text="Continua" value={SchoolDayType.Continue} selected={dayTypes.includes(SchoolDayType.Continue)} setSelected={setDayTypes}/>
                    <Btn text="Partida" value={SchoolDayType.Splitted} selected={dayTypes.includes(SchoolDayType.Splitted)} setSelected={setDayTypes}/>
                </div>
            </div>
            <div className="step">
                <div className="title">
                <img src={Counter6} alt="" />
                <span>Selecciona los tipos de centros </span>
                </div>
                <div className="btns">
                    <Btn text="CRA" value={SchoolCenterType.CRA} selected={centerTypes.includes(SchoolCenterType.CRA)} setSelected={setCenterTypes}/>
                    <Btn text="Singular" value={SchoolCenterType.CAES} selected={centerTypes.includes(SchoolCenterType.CAES)} setSelected={setCenterTypes}/>
                </div>
            </div>

        </section>
        </>
    )
}