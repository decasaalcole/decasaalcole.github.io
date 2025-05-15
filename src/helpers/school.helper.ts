import {
  School,
  SchoolDayType,
  SchoolRegimenType,
  SchoolEducationType,
  SchoolCenterType,
  Province,
  SchoolEducationLevel,
  ToZipCodeDistTime,
  rawSchool,
  RawSchoolRegimenType,
  FilterType,
} from "../types/types";

function filterSchoolsByProvince(
  schools: School[],
  provinces: Province[]
): School[] {
  console.log("filterSchoolsByProvince | schools IN", schools.length);
  if (provinces.length === Object.keys(Province).length) {
    console.log("filterSchoolsByProvince | schools OUT", schools.length);
    return schools;
  }
  const response = schools.filter((school: School) => {
    return provinces.includes(school.prov as Province);
  });
  console.log("filterSchoolsByProvince | schools OUT", response.length);
  return response;
}

function filterSchoolsByRegimen(
  schools: School[],
  regimenTypes: SchoolRegimenType[]
): School[] {
  console.log("filterSchoolsByRegimen | schools IN", schools.length);
  if (regimenTypes.length === Object.keys(SchoolRegimenType).length) {
    console.log("filterSchoolsByRegimen | schools OUT", schools.length);
    return schools;
  }
  const response = schools.filter((school: School) => {
    return regimenTypes.includes(school.reg as SchoolRegimenType);
  });
  console.log("filterSchoolsByRegimen | schools OUT", response.length);
  return response;
}

function filterSchoolsByEducation(
  schools: School[],
  educationTypes: SchoolEducationType[]
): School[] {
  console.log("filterSchoolsByEducation | schools IN", schools.length);
  if (educationTypes.length === Object.keys(SchoolEducationType).length) {
    console.log("filterSchoolsByEducation | schools OUT", schools.length);
    return schools;
  }
  const response = schools.filter((school: School) => {
    return educationTypes.some((educationType: SchoolEducationType) => {
      return school.reduNiveles.includes(educationType);
    });
  });
  console.log("filterSchoolsByEducation | schools OUT", response.length);
  return response;
}

function filterSchoolsByCenterType(
  schools: School[],
  centerTypes: SchoolCenterType[]
): School[] {
  console.log("filterSchoolsByCenterType | schools IN", schools.length);
  if (centerTypes.length === 0) {
    console.log("filterSchoolsByCenterType | schools OUT", schools.length);
    return schools;
  }
  const response = schools.filter((school: School) => {
    return centerTypes.some((centerType) => {
      if (centerType === SchoolCenterType.CRA) {
        return school.cra;
      }
      if (centerType === SchoolCenterType.CAES) {
        return school.caes;
      }
      return false;
    });
  });
  console.log("filterSchoolsByCenterType | schools OUT", response.length);
  return response;
}

function filterSchoolsByDayType(
  schools: School[],
  dayType: SchoolDayType[]
): School[] {
  console.log("filterSchoolsByDayType | schools IN", schools.length);
  if (dayType.length === Object.keys(SchoolDayType).length) {
    console.log("filterSchoolsByDayType | schools OUT", schools.length);
    return schools;
  }
  const response = schools.filter((school: School) => {
    return dayType.some((type) => {
      if (type === SchoolDayType.Continue) {
        return school.jornadaContinua === true;
      }
      if (type === SchoolDayType.Splitted) {
        return school.jornadaContinua === false;
      }
      return false;
    });
  });
  console.log("filterSchoolsByDayType | schools OUT", response.length);
  return response;
}

function hasJornadaContinua(school: rawSchool): boolean {
  return school.info
    ? school.info.includes("Jornada escolar modificada")
    : false;
}

function isCaesSchool(school: rawSchool): boolean {
  return school.info
    ? school.info.some((info: string) => info.includes("Centro Singular"))
    : false;
}

function simplifyRegimen(school: rawSchool): string {
  switch (school.reg) {
    case RawSchoolRegimenType.Public:
      return SchoolRegimenType.Public;
    case RawSchoolRegimenType.Private:
      return SchoolRegimenType.Private;
    case RawSchoolRegimenType.PrivateConc:
      return SchoolRegimenType.PrivateConc;
    default:
      return SchoolRegimenType.Public;
  }
}

function calculateProvince(school: rawSchool): Province {
  const provinceMap: Record<string, Province> = {
    "12": Province.Castellon,
    "46": Province.Valencia,
    "03": Province.Alicante,
  };

  const prefix = school.cp.toString().slice(0, 2);
  return provinceMap[prefix] || Province.Valencia; // Default to Valencia if unknown
}

function getSchoolSchedule(school: rawSchool): string[] {
  return school?.horario?.filter((h: string) => !h.includes("JORNADA")) || [];
}

function calculateNiveles(school: rawSchool): SchoolEducationType[] {
  if (!school.niveles || school.niveles.length === 0) {
    return [];
  }
  const levels = school.niveles.map((nivel: any) => {
    if (
      nivel.nivel === SchoolEducationLevel.EI1
    ) {
      return SchoolEducationType.Infantil1;
    } else if (nivel.nivel === SchoolEducationLevel.EI2) {
      return SchoolEducationType.Infantil2;
    } else if (nivel.nivel === SchoolEducationLevel.EP) {
      return SchoolEducationType.Primaria;
    } else if (nivel.nivel === SchoolEducationLevel.ESP) {
      return SchoolEducationType.Especial;
    } else if (
      nivel.nivel === SchoolEducationLevel.ESO ||
      nivel.nivel === SchoolEducationLevel.ESO1
    ) {
      return SchoolEducationType.ESO;
    } else if (nivel.nivel === SchoolEducationLevel.BACH) {
      return SchoolEducationType.Bachillerato;
    } else if (
      nivel.nivel === SchoolEducationLevel.CICLOS ||
      nivel.nivel === SchoolEducationLevel.FP ||
      nivel.nivel === SchoolEducationLevel.MODULOS ||
      nivel.nivel === SchoolEducationLevel.PROF_INICIAL ||
      nivel.nivel === SchoolEducationLevel.HOGAR
    ) {
      return SchoolEducationType.FP;
    } else if (nivel.nivel === SchoolEducationLevel.ADU) {
      return SchoolEducationType.Adultos;
    } else {
      return "";
    }
  });
  return [
    ...new Set(
      levels.filter(
        (level: string): level is SchoolEducationType => level !== ""
      )
    ),
  ] as SchoolEducationType[];
}

export function filterSchools(
  schools: School[],
  regimenTypes: SchoolRegimenType[],
  educationTypes: SchoolEducationType[],
  dayTypes: SchoolDayType[],
  province: Province[],
  centerTypes: SchoolCenterType[]
): School[] {
  console.log("----------------------");
  const filteredSchoolsByProvince = filterSchoolsByProvince(schools, province);
  const filteredSchoolsByRegimen = filterSchoolsByRegimen(
    filteredSchoolsByProvince,
    regimenTypes
  );
  const filteredSchoolsByEducationType = filterSchoolsByEducation(
    filteredSchoolsByRegimen,
    educationTypes
  );
  const filteredSchoolsByDayType = filterSchoolsByDayType(
    filteredSchoolsByEducationType,
    dayTypes
  );
  const filteredSchoolsByCenterType = filterSchoolsByCenterType(
    filteredSchoolsByDayType,
    centerTypes
  );
  return filteredSchoolsByCenterType;
}

export function getZipCodeTimes(
  times: any[],
  cp: number
): ToZipCodeDistTime[] | null {
  const rawZipCodeTimes = times[cp] as string[];
  if (!rawZipCodeTimes) {
    return null;
  } else {
    return rawZipCodeTimes.map((strTime: string) => {
      const [zcTo, dist, time] = strTime.split(",");
      return {
        zcTo: Number(zcTo),
        dist: Number(dist),
        time: Number(time),
      };
    });
  }
}

export function populateSchoolsByZipCodeWithTimeAndDist(
  schools: School[],
  times: ToZipCodeDistTime[],
  cp: number
): School[] {
  const OFFSET_TIME = 5;
  const schoolsWithTimesAndDist = schools.map((school) => {
    const zc = times.find((time) => Number(time.zcTo) === Number(school.cp));
    if (zc?.dist && zc?.time) {
      school.dist = zc.dist;
      school.time = zc.time + OFFSET_TIME;
    }
    if (school.cp === cp.toString()) {
      school.dist = 0;
      school.time = 0 + OFFSET_TIME;
    }
    return school;
  });
  const filteredSchools = schoolsWithTimesAndDist.filter(
    (school) => school.time !== -1
  );
  return filteredSchools;
}

export function sortSchoolsByTime(schools: School[]): School[] {
  return schools.sort((a, b) => a.time - b.time).map((school, index) => ({ ...school, num: index + 1 }));
}

export function filterSchoolsByTimeOrDistance(schools: School[], filterType: FilterType, filterValue: number): School[] {
  if(filterType === FilterType.Distance) {
    return schools.filter(school => school.dist <= filterValue);
  } else {
    return schools.filter(school => school.time <= filterValue);
  }
}

export function buildAddress(school: School) {
  return `${school.dir.trim()}, ${school.cp} ${school.muni}`;
}

export function prepareSchools(
  rawSchools: rawSchool[],
  craSchools: string[]
): School[] {
  const schools = rawSchools.map((rawSchool) => {
    const cra = craSchools.includes(rawSchool.codigo);
    const caes = isCaesSchool(rawSchool);
    const jornadaContinua = hasJornadaContinua(rawSchool);
    const horario = getSchoolSchedule(rawSchool);
    const reduNiveles = calculateNiveles(rawSchool);
    const reg = simplifyRegimen(rawSchool);
    const prov = calculateProvince(rawSchool);

    return {
      ...rawSchool,
      horario,
      dist: -1,
      time: -1,
      cra,
      caes,
      jornadaContinua,
      reduNiveles,
      reg,
      prov,
    };
  }) as School[];
  return schools;
}

export function getMaxTime(codes: ToZipCodeDistTime[] | null): number {
  if (!codes) {
    return 300;
  }
  const maxTime = codes.map(code => code.time).reduce((max, time) => Math.max(max, time), 0);
  return Math.ceil(maxTime / 10) * 10;
}

export function getMaxDistance(codes: ToZipCodeDistTime[] | null): number {
  if (!codes) {
    return 250;
  }
  const maxDistance = codes.map(code => code.dist).reduce((max, dist) => Math.max(max, dist), 0);
  return Math.ceil(maxDistance / 10) * 10;
}
