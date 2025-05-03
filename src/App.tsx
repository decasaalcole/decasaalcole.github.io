import { Header } from './components/Header.tsx'
import { Finder } from './components/Finder.tsx'
import { Results } from './components/Results.tsx'
import { useEffect, useState } from 'react';
import { SchoolRegimen, SchoolType, School, SchoolDayType, Province } from './types/types.ts';
import baseSchools from './assets/data/schools_base.json';
import infoSchools from './assets/data/schools_info.json';
import craSchools from './assets/data/schools_cra.json';
import caeSchools from './assets/data/schools_cae.json';
import { filterSchools, mergeSchools } from './helpers/school.helper.ts';

function App() {
  const [zipCode, setZipCode] = useState(46113);
  const [regimens, setRegimens] = useState([SchoolRegimen.Public]);
  const [types, setTypes] = useState([SchoolType.Infantil]);
  const [schools, setSchools] = useState<School[]>([]);
  const [dayTypes, setDayTypes] = useState([SchoolDayType.Continue, SchoolDayType.Splitted]);
  const [provinces, setProvinces] = useState([Province.Castellon, Province.Valencia, Province.Alicante]);

  const [rawSchools, setRawSchools] = useState<School[]>([]);

  // Prepare schools data
  useEffect(() => {
    const mergedSchools = mergeSchools(baseSchools, infoSchools, craSchools, caeSchools);
    setRawSchools(mergedSchools);
  }, []);

  // Filter schools with debounce of 2 seconds
  useEffect(() => {
    const filterData = setTimeout(() => {
      const filteredSchools = filterSchools(rawSchools, regimens, types, dayTypes, provinces);
      setSchools(filteredSchools);
    }, 2000);
    return () => clearTimeout(filterData);
  }, [rawSchools, regimens, zipCode, types, dayTypes, provinces]);

  const handleRegimenChange = (value: SchoolRegimen) => {
    console.log('value', value);
    if (regimens.includes(value)) {
      setRegimens(prev => prev.filter(regimen => regimen !== value));
    } else {
      setRegimens(prev => [...prev, value]);
    }
    if (regimens.length === 0) {
      setRegimens([SchoolRegimen.Public, SchoolRegimen.Private, SchoolRegimen.PrivateConc]);
    }
  }

  const handleTypeChange = (value: SchoolType) => {
    if (types.includes(value)) {
      setTypes(prev => prev.filter(type => type !== value));
    } else {
      setTypes(prev => [...prev, value]);
    }
    if (types.length === 0) {
      setTypes([SchoolType.Primaria]);
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

  const handleProvinceChange = (value: Province) => {
    if (provinces.includes(value)) {
      setProvinces(prev => prev.filter(prov => prov !== value));
    } else {
      setProvinces(prev => [...prev, value]);
    }
  }

  if (regimens.length === 0) {
    setRegimens([SchoolRegimen.Public, SchoolRegimen.Private, SchoolRegimen.PrivateConc]);
  }
  if (types.length === 0) {
    setTypes([SchoolType.Primaria, SchoolType.Infantil, SchoolType.Especial, SchoolType.ESO, SchoolType.Bachillerato, SchoolType.FP, SchoolType.Adultos, SchoolType.CRA]);
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
        regimens={regimens} 
        setRegimens={handleRegimenChange} 
        types={types} 
        setTypes={handleTypeChange} 
        dayTypes={dayTypes}
        setDayTypes={handleDayTypesChange}
        provinces={provinces}
        setProvinces={handleProvinceChange}
      />
      <Results schools={schools} />
    </>
  )
}

export default App
