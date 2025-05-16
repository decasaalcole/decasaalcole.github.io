import { Header } from './components/Header.tsx'
import { Finder } from './components/Finder.tsx'
import { Results } from './components/Results.tsx'
import { useEffect, useState } from 'react';
import { SchoolRegimenType, SchoolEducationType, School, SchoolDayType, SchoolCenterType, Province, rawSchool, FilterType } from './types/types.ts';
import baseSchools from './assets/data/schools.json'
import craSchools from './assets/data/schools_cra.json';
import travelTimes from './assets/data/travel_times.json';
import { filterSchools, prepareSchools, getZipCodeTimes, sortSchoolsByTime, populateSchoolsByZipCodeWithTimeAndDist, filterSchoolsByTimeOrDistance, getMaxDistance, getMaxTime } from './helpers/school.helper.ts';
import { Footer } from './components/Footer.tsx';

function App() {
  // schools
  const [rawSchools, setRawSchools] = useState<School[]>([]);
  const [schools, setSchools] = useState<School[]>([]);

  // filters
  const [zipCode, setZipCode] = useState(46113);
  const [regimenTypes, setRegimenTypes] = useState([SchoolRegimenType.Public]);
  const [educationTypes, setEducationTypes] = useState([SchoolEducationType.Infantil1, SchoolEducationType.Infantil2, SchoolEducationType.Primaria]);
  const [centerTypes, setCenterTypes] = useState([SchoolCenterType.ORD]);
  const [dayTypes, setDayTypes] = useState([SchoolDayType.Continue, SchoolDayType.Splitted]);
  const [provinces, setProvinces] = useState([Province.Castellon, Province.Valencia, Province.Alicante]);
  const [filterType, setFilterType] = useState(FilterType.Distance);
  const [filterValue, setFilterValue] = useState(100);
  const [maxTime, setMaxTime] = useState(6);
  const [maxDistance, setMaxDistance] = useState(10);
  

  // Prepare schools data
  useEffect(() => {
    const schools = prepareSchools(baseSchools as rawSchool[], craSchools as string[]);
    setRawSchools(schools);
  }, []);

  // prepare max time and max distance
  useEffect(() => {
    const zipCodeTimes = getZipCodeTimes(travelTimes as any, zipCode);
    const maxTime = getMaxTime(zipCodeTimes);
    const maxDistance = getMaxDistance(zipCodeTimes);
    setMaxTime(maxTime);
    setMaxDistance(maxDistance);
  }, [zipCode]);

  // prepare filter value
  useEffect(() => {
    if (filterType === FilterType.Time) {
      setFilterValue(maxTime);
    } else {
      setFilterValue(maxDistance);
    }
  }, [maxTime, maxDistance, filterType]);

  // Filter schools with debounce of 2 seconds
  useEffect(() => {
    const isValidZipCode = zipCode.toString().length > 3 && zipCode.toString().length < 6;
    
    if (!isValidZipCode) {
      setSchools([]);
      return;
    }

    const filterData = setTimeout(() => {
      const zipCodeTimes = getZipCodeTimes(travelTimes as any, zipCode);
      
      if (!zipCodeTimes) {
        setSchools([]);
        return;
      }

      const filteredSchools = filterSchools(
        rawSchools,
        regimenTypes,
        educationTypes, 
        dayTypes,
        provinces,
        centerTypes
      );

      const schoolsWithTimesAndDist = populateSchoolsByZipCodeWithTimeAndDist(
        filteredSchools,
        zipCodeTimes,
        zipCode
      );

      const sortedSchools = sortSchoolsByTime(schoolsWithTimesAndDist);
      const filteredByTimeOrDist = filterSchoolsByTimeOrDistance(
        sortedSchools,
        filterType,
        filterValue
      );

      setSchools(filteredByTimeOrDist);
    }, 500);

    return () => clearTimeout(filterData);
  }, [
    rawSchools,
    regimenTypes,
    zipCode,
    educationTypes,
    dayTypes,
    provinces,
    centerTypes,
    filterType,
    filterValue
  ]);

  const handleRegimenTypeChange = (value: SchoolRegimenType) => {
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
    if (centerTypes.length === 0) {
      setCenterTypes([SchoolCenterType.ORD]);
    }
  }

  const handleProvinceChange = (value: Province) => {
    if (provinces.includes(value)) {
      setProvinces(prev => prev.filter(prov => prov !== value));
    } else {
      setProvinces(prev => [...prev, value]);
    }
  }

  const handleFilterTypeChange = (value: FilterType) => {
    setFilterType(value);
  }

  if (regimenTypes.length === 0) {
    setRegimenTypes([SchoolRegimenType.Public, SchoolRegimenType.Private, SchoolRegimenType.PrivateConc]);
  }
  if (educationTypes.length === 0) {
    setEducationTypes([SchoolEducationType.Primaria, SchoolEducationType.Infantil1, SchoolEducationType.Infantil2, SchoolEducationType.Especial, SchoolEducationType.ESO, SchoolEducationType.Bachillerato, SchoolEducationType.FP, SchoolEducationType.Adultos]);
  }

  if (dayTypes.length === 0) {
    setDayTypes([SchoolDayType.Continue, SchoolDayType.Splitted]);
  }
  if (provinces.length === 0) {
    setProvinces([Province.Castellon, Province.Valencia, Province.Alicante]);
  }

  if (centerTypes.length === 0) {
    setCenterTypes([SchoolCenterType.ORD]);
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
        filterType={filterType}
        setFilterType={handleFilterTypeChange}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        maxTime={maxTime}
        maxDistance={maxDistance}
      />
      <Results schools={schools} />
      <Footer />
    </>
  )
}

export default App
