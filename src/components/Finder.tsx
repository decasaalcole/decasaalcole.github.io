import './Finder.css';
import Counter1 from '../assets/icons/counter_1.svg';
import Counter2 from '../assets/icons/counter_2.svg';
import Counter3 from '../assets/icons/counter_3.svg';
import Counter4 from '../assets/icons/counter_4.svg';
import Counter5 from '../assets/icons/counter_5.svg';
import Counter6 from '../assets/icons/counter_6.svg';
import Counter7 from '../assets/icons/counter_7.svg';

const COUNTERS = [Counter1, Counter2, Counter3, Counter4, Counter5, Counter6, Counter7];
import { FinderProps, SchoolRegimenType, SchoolEducationType, SchoolDayType, Province, SchoolCenterType, StepProps, FilterType } from '../types/types';
import { Btn } from './btns/Btn';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



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
    setCenterTypes,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    maxTime,
    maxDistance
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
            
            <Step number={1} title="Introduce el código postal donde resides" counterIcon={COUNTERS[0]}>
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

            <Step number={2} title="Selecciona las provincias" counterIcon={COUNTERS[1]}>
                <div className="btns">
                    <Btn text="Castellón" value={Province.Castellon} selected={provinces.includes(Province.Castellon)} setSelected={setProvinces} filter />
                    <Btn text="Valencia" value={Province.Valencia} selected={provinces.includes(Province.Valencia)} setSelected={setProvinces} filter />
                    <Btn text="Alicante" value={Province.Alicante} selected={provinces.includes(Province.Alicante)} setSelected={setProvinces} filter />
                </div>
            </Step>

            <Step number={3} title="Selecciona los régimenes de los centros" counterIcon={COUNTERS[2]}>
                <div className="btns">
                    <Btn text="Público" value={SchoolRegimenType.Public} selected={regimenTypes.includes(SchoolRegimenType.Public)} setSelected={setRegimenTypes} filter />
                    <Btn text="Privado" value={SchoolRegimenType.Private} selected={regimenTypes.includes(SchoolRegimenType.Private)} setSelected={setRegimenTypes} filter />
                    <Btn text="Priv. concertado" value={SchoolRegimenType.PrivateConc} selected={regimenTypes.includes(SchoolRegimenType.PrivateConc)} setSelected={setRegimenTypes} filter />
                </div>
            </Step>

            <Step number={4} title="Selecciona los tipos de nivel educativo" counterIcon={COUNTERS[3]}>
                <div className="btns">
                    <Btn text="Infantil 1er ciclo" value={SchoolEducationType.Infantil1} selected={educationTypes.includes(SchoolEducationType.Infantil1)} setSelected={setEducationTypes} filter />
                    <Btn text="Infantil 2º ciclo" value={SchoolEducationType.Infantil2} selected={educationTypes.includes(SchoolEducationType.Infantil2)} setSelected={setEducationTypes} filter />
                </div>
                <div className="btns">
                    <Btn text="Primaria" value={SchoolEducationType.Primaria} selected={educationTypes.includes(SchoolEducationType.Primaria)} setSelected={setEducationTypes} filter />
                    <Btn text="Especial" value={SchoolEducationType.Especial} selected={educationTypes.includes(SchoolEducationType.Especial)} setSelected={setEducationTypes} filter />
                    <Btn text="E.S.O." value={SchoolEducationType.ESO} selected={educationTypes.includes(SchoolEducationType.ESO)} setSelected={setEducationTypes} filter />
                </div>
                <div className="btns">
                    <Btn text="Bachillerato" value={SchoolEducationType.Bachillerato} selected={educationTypes.includes(SchoolEducationType.Bachillerato)} setSelected={setEducationTypes} filter />
                    <Btn text="FP" value={SchoolEducationType.FP} selected={educationTypes.includes(SchoolEducationType.FP)} setSelected={setEducationTypes} filter />
                    <Btn text="Adultos" value={SchoolEducationType.Adultos} selected={educationTypes.includes(SchoolEducationType.Adultos)} setSelected={setEducationTypes} filter />
                </div>
            </Step>

            <Step number={5} title="Selecciona los tipos de jornada" counterIcon={COUNTERS[4]}>
                <div className="btns">
                    <Btn text="Continua" value={SchoolDayType.Continue} selected={dayTypes.includes(SchoolDayType.Continue)} setSelected={setDayTypes} filter />
                    <Btn text="Partida" value={SchoolDayType.Splitted} selected={dayTypes.includes(SchoolDayType.Splitted)} setSelected={setDayTypes} filter />
                </div>
            </Step>

            <Step number={6} title="Selecciona los tipos de centros" counterIcon={COUNTERS[5]}>
                <div className="btns">
                    <Btn text="Ordinario" value={SchoolCenterType.ORD} selected={centerTypes.includes(SchoolCenterType.ORD)} setSelected={setCenterTypes} filter />
                    <Btn text="Rural Agrupado" value={SchoolCenterType.CRA} selected={centerTypes.includes(SchoolCenterType.CRA)} setSelected={setCenterTypes} filter />
                    <Btn text="Singular" value={SchoolCenterType.CAES} selected={centerTypes.includes(SchoolCenterType.CAES)} setSelected={setCenterTypes} filter />
                </div>
            </Step>
            <Step number={7} title="Limita por distancia o tiempo de viaje" counterIcon={COUNTERS[6]}>
                <div className="btns">
                    <Btn text="Distancia" value={FilterType.Distance} selected={filterType === FilterType.Distance} setSelected={setFilterType} filter />
                    <Btn text="Tiempo de viaje" value={FilterType.Time} selected={filterType === FilterType.Time} setSelected={setFilterType} filter />
                </div>
                <div className="slider">
                    <div className="slider-ctrl">
                        <Slider min={0} max={filterType === FilterType.Distance ? maxDistance : maxTime} value={filterValue} onChange={setFilterValue} />
                    </div>
                    <div className="slider-text">
                        <span>{filterValue} {filterType === FilterType.Distance ? 'km' : 'min'}</span>
                    </div>                    
                </div>
            </Step>
        </section>
    );
}
