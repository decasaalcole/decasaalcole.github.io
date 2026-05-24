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
import { Banner } from './components/Banner.tsx';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { About } from './components/About';
import { Map } from './components/Map';

import './App.css';

function makeToggleHandler<T>(
  setter: (updater: (prev: T[]) => T[]) => void,
  fallback: T[]
) {
  return (value: T) =>
    setter(prev => {
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      return next.length === 0 ? fallback : next;
    });
}

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
    const schools = prepareSchools(baseSchools as unknown as rawSchool[], craSchools as string[]);
    setRawSchools(schools);
  }, []);

  // prepare max time and max distance
  useEffect(() => {
    const zipCodeTimes = getZipCodeTimes(travelTimes as Record<string, string[]>, zipCode);
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
      const zipCodeTimes = getZipCodeTimes(travelTimes as Record<string, string[]>, zipCode);

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
      
      const filteredByTimeOrDist = filterSchoolsByTimeOrDistance(
        schoolsWithTimesAndDist,
        filterType,
        filterValue
      );

      const sortedSchools = sortSchoolsByTime(filteredByTimeOrDist);

      setSchools(sortedSchools);
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

  const handleRegimenTypeChange   = makeToggleHandler(setRegimenTypes,  [SchoolRegimenType.Public, SchoolRegimenType.Private, SchoolRegimenType.PrivateConc]);
  const handleEducationTypeChange  = makeToggleHandler(setEducationTypes, [SchoolEducationType.Primaria]);
  const handleDayTypesChange       = makeToggleHandler(setDayTypes,       [SchoolDayType.Continue, SchoolDayType.Splitted]);
  const handleCenterTypeChange     = makeToggleHandler(setCenterTypes,    [SchoolCenterType.ORD]);
  const handleProvinceChange       = makeToggleHandler(setProvinces,      [Province.Castellon, Province.Valencia, Province.Alicante]);
  const handleFilterValueChange    = (value: number | number[]) => setFilterValue(Array.isArray(value) ? value[0] : value);

  const { pathname } = useLocation();
  const hideFooter = pathname === '/mapa' && window.innerWidth < 700;

  return (
    <>
      <Header />
      <Banner />
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/acerca-de">Acerca de</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
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
              setFilterType={setFilterType}
              filterValue={filterValue}
              setFilterValue={handleFilterValueChange}
              maxTime={maxTime}
              maxDistance={maxDistance}
            />
            <Results schools={schools} />
          </>
        } />
        <Route path="/acerca-de" element={<About />} />
        <Route path="/mapa" element={<Map />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginBottom: '3em' }}>404 - Página no encontrada</h2>} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
