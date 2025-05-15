import './Finder.css';
import Counter1 from '../assets/icons/counter_1.svg';
import Counter2 from '../assets/icons/counter_2.svg';
import Counter3 from '../assets/icons/counter_3.svg';
import Counter4 from '../assets/icons/counter_4.svg';
import Counter5 from '../assets/icons/counter_5.svg';
import Counter6 from '../assets/icons/counter_6.svg';
import { FinderProps, SchoolRegimenType, SchoolEducationType, SchoolDayType, Province, SchoolCenterType, StepProps } from '../types/types';
import { Btn } from './btns/Btn';



const Step = ({ number, title, children, counterIcon }: StepProps) => (
    <div className="step">
        <div className="title">
            <img src={counterIcon} alt={`Step ${number}`} />
            <span>{title}</span>
        </div>
        {children}
    </div>
);

export function Finder({ 
    zipCode, 
    setZipCode, 
    regimenTypes, 
    setRegimenTypes, 
    educationTypes, 
    setEducationTypes, 
    dayTypes, 
    setDayTypes, 
    provinces, 
    setProvinces, 
    centerTypes, 
    setCenterTypes 
}: FinderProps) {

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 5) {
            setZipCode(Number(value));
        }
    };

    return (
        <section className="finder">
            <h2>Selección de centros</h2>
            
            <Step number={1} title="Introduce el código postal donde resides" counterIcon={Counter1}>
                <div className="input">
                    <input 
                        type="number" 
                        placeholder="46113" 
                        value={zipCode || ''} 
                        onChange={handleZipCodeChange}
                        min="0"
                        max="99999"
                        aria-label="Código postal"
                    />
                </div>
            </Step>

            <Step number={2} title="Selecciona las provincias" counterIcon={Counter2}>
                <div className="btns">
                    <Btn text="Castellón" value={Province.Castellon} selected={provinces.includes(Province.Castellon)} setSelected={setProvinces}/>
                    <Btn text="Valencia" value={Province.Valencia} selected={provinces.includes(Province.Valencia)} setSelected={setProvinces}/>
                    <Btn text="Alicante" value={Province.Alicante} selected={provinces.includes(Province.Alicante)} setSelected={setProvinces}/>
                </div>
            </Step>

            <Step number={3} title="Selecciona los régimenes de los centros" counterIcon={Counter3}>
                <div className="btns">
                    <Btn text="Público" value={SchoolRegimenType.Public} selected={regimenTypes.includes(SchoolRegimenType.Public)} setSelected={setRegimenTypes}/>
                    <Btn text="Privado" value={SchoolRegimenType.Private} selected={regimenTypes.includes(SchoolRegimenType.Private)} setSelected={setRegimenTypes}/>
                    <Btn text="Priv. concertado" value={SchoolRegimenType.PrivateConc} selected={regimenTypes.includes(SchoolRegimenType.PrivateConc)} setSelected={setRegimenTypes}/>
                </div>
            </Step>

            <Step number={4} title="Selecciona los tipos de nivel educativo" counterIcon={Counter4}>
                <div className="btns">
                    <Btn text="Infantil 1er ciclo" value={SchoolEducationType.Infantil1} selected={educationTypes.includes(SchoolEducationType.Infantil1)} setSelected={setEducationTypes}/>
                    <Btn text="Infantil 2º ciclo" value={SchoolEducationType.Infantil2} selected={educationTypes.includes(SchoolEducationType.Infantil2)} setSelected={setEducationTypes}/>                                        
                </div>
                <div className="btns">
                    <Btn text="Primaria" value={SchoolEducationType.Primaria} selected={educationTypes.includes(SchoolEducationType.Primaria)} setSelected={setEducationTypes}/>
                    <Btn text="Especial" value={SchoolEducationType.Especial} selected={educationTypes.includes(SchoolEducationType.Especial)} setSelected={setEducationTypes}/>
                    <Btn text="E.S.O." value={SchoolEducationType.ESO} selected={educationTypes.includes(SchoolEducationType.ESO)} setSelected={setEducationTypes}/>                    
                </div>
                <div className="btns">
                    <Btn text="Bachillerato" value={SchoolEducationType.Bachillerato} selected={educationTypes.includes(SchoolEducationType.Bachillerato)} setSelected={setEducationTypes}/>
                    <Btn text="FP" value={SchoolEducationType.FP} selected={educationTypes.includes(SchoolEducationType.FP)} setSelected={setEducationTypes}/>
                    <Btn text="Adultos" value={SchoolEducationType.Adultos} selected={educationTypes.includes(SchoolEducationType.Adultos)} setSelected={setEducationTypes}/>
                </div>
            </Step>

            <Step number={5} title="Selecciona los tipos de jornada" counterIcon={Counter5}>
                <div className="btns">
                    <Btn text="Continua" value={SchoolDayType.Continue} selected={dayTypes.includes(SchoolDayType.Continue)} setSelected={setDayTypes}/>
                    <Btn text="Partida" value={SchoolDayType.Splitted} selected={dayTypes.includes(SchoolDayType.Splitted)} setSelected={setDayTypes}/>
                </div>
            </Step>

            <Step number={6} title="Selecciona los tipos de centros" counterIcon={Counter6}>
                <div className="btns">
                    <Btn text="C. Rural Agrupado" value={SchoolCenterType.CRA} selected={centerTypes.includes(SchoolCenterType.CRA)} setSelected={setCenterTypes}/>
                    <Btn text="C. Singular" value={SchoolCenterType.CAES} selected={centerTypes.includes(SchoolCenterType.CAES)} setSelected={setCenterTypes}/>
                </div>
            </Step>
        </section>
    );
}