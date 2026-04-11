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

const EDUCATION_LEVEL_MAP: Partial<Record<SchoolEducationLevel, SchoolEducationType>> = {
  [SchoolEducationLevel.EI1]:          SchoolEducationType.Infantil1,
  [SchoolEducationLevel.EI2]:          SchoolEducationType.Infantil2,
  [SchoolEducationLevel.EP]:           SchoolEducationType.Primaria,
  [SchoolEducationLevel.ESP]:          SchoolEducationType.Especial,
  [SchoolEducationLevel.ESO]:          SchoolEducationType.ESO,
  [SchoolEducationLevel.ESO1]:         SchoolEducationType.ESO,
  [SchoolEducationLevel.BACH]:         SchoolEducationType.Bachillerato,
  [SchoolEducationLevel.CICLOS]:       SchoolEducationType.FP,
  [SchoolEducationLevel.FP]:           SchoolEducationType.FP,
  [SchoolEducationLevel.MODULOS]:      SchoolEducationType.FP,
  [SchoolEducationLevel.PROF_INICIAL]: SchoolEducationType.FP,
  [SchoolEducationLevel.HOGAR]:        SchoolEducationType.FP,
  [SchoolEducationLevel.ADU]:          SchoolEducationType.Adultos,
};

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
    case RawSchoolRegimenType.Public:     return SchoolRegimenType.Public;
    case RawSchoolRegimenType.Private:    return SchoolRegimenType.Private;
    case RawSchoolRegimenType.PrivateConc:return SchoolRegimenType.PrivateConc;
    default:                              return SchoolRegimenType.Public;
  }
}

function calculateProvince(school: rawSchool): Province {
  const provinceMap: Record<string, Province> = {
    "12": Province.Castellon,
    "46": Province.Valencia,
    "03": Province.Alicante,
  };
  const prefix = school.cp.toString().slice(0, 2);
  return provinceMap[prefix] || Province.Valencia;
}

function getSchoolSchedule(school: rawSchool): string[] {
  return school?.horario?.filter((h: string) => !h.includes("JORNADA")) || [];
}

function calculateNiveles(school: rawSchool): SchoolEducationType[] {
  if (!school.niveles || school.niveles.length === 0) return [];
  return [...new Set(
    school.niveles
      .map(n => EDUCATION_LEVEL_MAP[n.nivel as SchoolEducationLevel])
      .filter((t): t is SchoolEducationType => t !== undefined)
  )];
}

export function filterSchools(
  schools: School[],
  regimenTypes: SchoolRegimenType[],
  educationTypes: SchoolEducationType[],
  dayTypes: SchoolDayType[],
  provinces: Province[],
  centerTypes: SchoolCenterType[]
): School[] {
  const skipProvinces  = provinces.length     === Object.keys(Province).length;
  const skipRegimen    = regimenTypes.length   === Object.keys(SchoolRegimenType).length;
  const skipEducation  = educationTypes.length === Object.keys(SchoolEducationType).length;
  const skipDayType    = dayTypes.length       === Object.keys(SchoolDayType).length;
  const skipCenterType = centerTypes.length    === Object.keys(SchoolCenterType).length;

  return schools.filter(school =>
    (skipProvinces  || provinces.includes(school.prov as Province)) &&
    (skipRegimen    || regimenTypes.includes(school.reg as SchoolRegimenType)) &&
    (skipEducation  || educationTypes.some(t => school.reduNiveles.includes(t))) &&
    (skipDayType    || dayTypes.some(t =>
      t === SchoolDayType.Continue ? school.jornadaContinua : !school.jornadaContinua
    )) &&
    (skipCenterType || centerTypes.some(t =>
      t === SchoolCenterType.CRA  ? school.cra :
      t === SchoolCenterType.CAES ? school.caes :
      !school.cra && !school.caes
    ))
  );
}

export function getZipCodeTimes(
  times: Record<string, string[]>,
  cp: number
): ToZipCodeDistTime[] | null {
  const rawZipCodeTimes = times[cp];
  if (!rawZipCodeTimes) return null;
  return rawZipCodeTimes.map((strTime: string) => {
    const [zcTo, dist, time] = strTime.split(",");
    return { zcTo: Number(zcTo), dist: Number(dist), time: Number(time) };
  });
}

export function populateSchoolsByZipCodeWithTimeAndDist(
  schools: School[],
  times: ToZipCodeDistTime[],
  cp: number
): School[] {
  const OFFSET_TIME = 5;
  return schools
    .map((school) => {
      if (school.cp === cp.toString()) {
        return { ...school, dist: 0, time: OFFSET_TIME };
      }
      const zc = times.find((time) => Number(time.zcTo) === Number(school.cp));
      if (zc?.dist && zc?.time) {
        return { ...school, dist: zc.dist, time: zc.time + OFFSET_TIME };
      }
      return school;
    })
    .filter(school => school.time !== -1);
}

export function sortSchoolsByTime(schools: School[]): School[] {
  return schools
    .sort((a, b) => a.time - b.time)
    .map((school, index) => ({ ...school, num: index + 1 }));
}

export function filterSchoolsByTimeOrDistance(
  schools: School[],
  filterType: FilterType,
  filterValue: number
): School[] {
  return filterType === FilterType.Distance
    ? schools.filter(school => school.dist <= filterValue)
    : schools.filter(school => school.time <= filterValue);
}

export function buildAddress(school: School) {
  return `${school.dir.trim()}, ${school.cp} ${school.muni}`;
}

export function prepareSchools(
  rawSchools: rawSchool[],
  craSchools: string[]
): School[] {
  return rawSchools.map((rawSchool) => ({
    ...rawSchool,
    horario:       getSchoolSchedule(rawSchool),
    dist:          -1,
    time:          -1,
    cra:           craSchools.includes(rawSchool.codigo),
    caes:          isCaesSchool(rawSchool),
    jornadaContinua: hasJornadaContinua(rawSchool),
    reduNiveles:   calculateNiveles(rawSchool),
    reg:           simplifyRegimen(rawSchool),
    prov:          calculateProvince(rawSchool),
  })) as School[];
}

export function getMaxTime(codes: ToZipCodeDistTime[] | null): number {
  if (!codes) return 300;
  return Math.ceil(codes.reduce((max, c) => Math.max(max, c.time), 0) / 10) * 10;
}

export function getMaxDistance(codes: ToZipCodeDistTime[] | null): number {
  if (!codes) return 250;
  return Math.ceil(codes.reduce((max, c) => Math.max(max, c.dist), 0) / 10) * 10;
}
