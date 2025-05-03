import { Header } from './components/Header.tsx'
import { Finder } from './components/Finder.tsx'
import { Results } from './components/Results.tsx'
import { useEffect, useState } from 'react';
import { SchoolRegimenType, SchoolEducationType, School, SchoolDayType, SchoolCenterType, Province } from './types/types.ts';
import baseSchools from './assets/data/schools_base.json';
import infoSchools from './assets/data/schools_info.json';
import craSchools from './assets/data/schools_cra.json';
import { filterSchools, prepareSchools } from './helpers/school.helper.ts';

function App() {
  // schools
  const [rawSchools, setRawSchools] = useState<School[]>([]);
  const [schools, setSchools] = useState<School[]>([]);

  // filters
  const [zipCode, setZipCode] = useState(46113);
  const [regimenTypes, setRegimenTypes] = useState([SchoolRegimenType.Public]);
  const [educationTypes, setEducationTypes] = useState([SchoolEducationType.Infantil]);
  const [centerTypes, setCenterTypes] = useState([] as SchoolCenterType[]);
  const [dayTypes, setDayTypes] = useState([SchoolDayType.Continue, SchoolDayType.Splitted]);
  const [provinces, setProvinces] = useState([Province.Castellon, Province.Valencia, Province.Alicante]);

  

  // Prepare schools data
  useEffect(() => {
    const schools = prepareSchools(baseSchools, infoSchools, craSchools);
    setRawSchools(schools);
  }, []);

  // Filter schools with debounce of 2 seconds
  useEffect(() => {
    const filterData = setTimeout(() => {
      const filteredSchools = filterSchools(rawSchools, regimenTypes, educationTypes, dayTypes, provinces, centerTypes);
      setSchools(filteredSchools);
    }, 2000);
    return () => clearTimeout(filterData);
  }, [rawSchools, regimenTypes, zipCode, educationTypes, dayTypes, provinces, centerTypes]);

  const handleRegimenTypeChange = (value: SchoolRegimenType) => {
    console.log('value', value);
    if (regimenTypes.includes(value)) {
      setRegimenTypes(prev => prev.filter(regimen => regimen !== value));
    } else {
      setRegimenTypes(prev => [...prev, value]);
    }
    if (regimenTypes.length === 0) {
      setRegimenTypes([SchoolRegimenType.Public, SchoolRegimenType.Private, SchoolRegimenType.PrivateConc]);
    }
  }

  const handleEducationTypeChange = (value: SchoolEducationType) => {
    if (educationTypes.includes(value)) {
      setEducationTypes(prev => prev.filter(type => type !== value));
    } else {
      setEducationTypes(prev => [...prev, value]);
    }
    if (educationTypes.length === 0) {
      setEducationTypes([SchoolEducationType.Primaria]);
    }
  }

  const handleDayTypesChange = (value: SchoolDayType) => {
    if (dayTypes.includes(value)) {
      setDayTypes(prev => prev.filter(dayType => dayType !== value));
    } else {
      setDayTypes(prev => [...prev, value]);
    }
    if (dayTypes.length === 0) {
      setDayTypes([SchoolDayType.Continue, SchoolDayType.Splitted]);
    }
  }

  const handleCenterTypeChange = (value: SchoolCenterType) => {
    if (centerTypes.includes(value)) {
      setCenterTypes(prev => prev.filter(center => center !== value));
    } else {
      setCenterTypes(prev => [...prev, value]);
    }
  }

  const handleProvinceChange = (value: Province) => {
    if (provinces.includes(value)) {
      setProvinces(prev => prev.filter(prov => prov !== value));
    } else {
      setProvinces(prev => [...prev, value]);
    }
  }

  if (regimenTypes.length === 0) {
    setRegimenTypes([SchoolRegimenType.Public, SchoolRegimenType.Private, SchoolRegimenType.PrivateConc]);
  }
  if (educationTypes.length === 0) {
    setEducationTypes([SchoolEducationType.Primaria, SchoolEducationType.Infantil, SchoolEducationType.Especial, SchoolEducationType.ESO, SchoolEducationType.Bachillerato, SchoolEducationType.FP, SchoolEducationType.Adultos]);
  }

  if (dayTypes.length === 0) {
    setDayTypes([SchoolDayType.Continue, SchoolDayType.Splitted]);
  }
  if (provinces.length === 0) {
    setProvinces([Province.Castellon, Province.Valencia, Province.Alicante]);
  }

  return (
    <>
      <Header />
      <Finder 
        zipCode={zipCode} 
        setZipCode={setZipCode} 
        regimenTypes={regimenTypes} 
        setRegimenTypes={handleRegimenTypeChange} 
        educationTypes={educationTypes} 
        setEducationTypes={handleEducationTypeChange} 
        dayTypes={dayTypes}
        setDayTypes={handleDayTypesChange}
        provinces={provinces}
        setProvinces={handleProvinceChange}
        centerTypes={centerTypes}
        setCenterTypes={handleCenterTypeChange}
      />
      <Results schools={schools} />
    </>
  )
}

export default App
