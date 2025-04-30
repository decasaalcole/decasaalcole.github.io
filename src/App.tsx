import { Header } from './components/Header.tsx'
import { Finder } from './components/Finder.tsx'
import { Results } from './components/Results.tsx'
import { useEffect, useState } from 'react';
import { SchoolRegimen, SchoolType, School, SchoolDayType, Province } from './types/types.ts';
import rawSchools from './assets/data/schools.json';
import { filterSchoolsByDayType, filterSchoolsByType, filterSchoolsByProvince, filterSchoolsByRegimen, filterSchoolsByZipCode } from './helpers/school.helper.ts';

function App() {
  const [zipCode, setZipCode] = useState(46113);
  const [regimens, setRegimen] = useState([SchoolRegimen.Public]);
  const [types, setType] = useState([SchoolType.Infantil]);
  const [schools, setSchools] = useState<School[]>([]);
  const [dayTypes, setDayTypes] = useState([SchoolDayType.Continue, SchoolDayType.Splitted]);
  const [provinces, setProvinces] = useState([Province.Castellon, Province.Valencia, Province.Alicante]);

  useEffect(() => {
    const filteredSchoolsByZipCode = filterSchoolsByZipCode(rawSchools as School[], zipCode);
    console.log('1. filteredSchoolsByZipCode', filteredSchoolsByZipCode);
    const filteredSchoolsByRegimen = filterSchoolsByRegimen(filteredSchoolsByZipCode, regimens);
    console.log('2. filteredSchoolsByRegimen', filteredSchoolsByRegimen);
    const filteredSchoolsByType = filterSchoolsByType(filteredSchoolsByRegimen, types);
    console.log('3. filteredSchoolsByType', filteredSchoolsByType);
    const filteredSchoolsByDayType = filterSchoolsByDayType(filteredSchoolsByType, dayTypes);
    console.log('4. filteredSchoolsByDayType', filteredSchoolsByDayType);
    const filteredSchoolsByProvince = filterSchoolsByProvince(filteredSchoolsByDayType, provinces);
    console.log('5. filteredSchoolsByProvince', filteredSchoolsByProvince);
    setSchools(filteredSchoolsByProvince);
  }, [regimens, zipCode, types, dayTypes, provinces]);

  const handleRegimenChange = (value: SchoolRegimen) => {
    console.log('value', value);
    if (regimens.includes(value)) {
      setRegimen(prev => prev.filter(regimen => regimen !== value));
    } else {
      setRegimen(prev => [...prev, value]);
    }
    if (regimens.length === 0) {
      setRegimen([SchoolRegimen.Public, SchoolRegimen.Private, SchoolRegimen.PrivateConc]);
    }
  }

  const handleTypeChange = (value: SchoolType) => {
    if (types.includes(value)) {
      setType(prev => prev.filter(type => type !== value));
    } else {
      setType(prev => [...prev, value]);
    }
    if (types.length === 0) {
      setType([SchoolType.Primaria]);
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
    setRegimen([SchoolRegimen.Public, SchoolRegimen.Private, SchoolRegimen.PrivateConc]);
  }
  if (types.length === 0) {
    setType([SchoolType.Primaria, SchoolType.Infantil, SchoolType.Especial, SchoolType.ESO, SchoolType.Bachillerato, SchoolType.FP, SchoolType.Adultos]);
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
        setRegimen={handleRegimenChange} 
        types={types} 
        setType={handleTypeChange} 
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
