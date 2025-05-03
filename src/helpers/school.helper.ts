import {
  School,
  SchoolDayType,
  SchoolRegimenType,
  SchoolEducationType,
  SchoolCenterType,
  Province,
  SchoolEducationLevel,
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
    return provinces.includes(school.provincia as Province);
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
    return regimenTypes.includes(school.regimen as SchoolRegimenType);
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
      return school.niveles.includes(educationType);
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
        return school.jornada_continua === true;
      }
      if (type === SchoolDayType.Splitted) {
        return school.jornada_continua === false;
      }
      return false;
    });
  });
  console.log("filterSchoolsByDayType | schools OUT", response.length);
  return response;
}

function hasJornadaContinua(school: any): boolean {
  return school.informacion_adicional
    ? school.informacion_adicional.includes("Jornada escolar modificada")
    : false;
}

function calculateNiveles(school: any): SchoolEducationType[] {
  if (!school.niveles_autorizados || school.niveles_autorizados.length === 0) {
    return [];
  }
  const levels = school.niveles_autorizados.map((nivel: any) => {
    if (
      nivel.nivel === SchoolEducationLevel.EI1 ||
      nivel.nivel === SchoolEducationLevel.EI2
    ) {
      return SchoolEducationType.Infantil;
    } else if (nivel.nivel === SchoolEducationLevel.EP) {
      return SchoolEducationType.Primaria;
    } else if (nivel.nivel === SchoolEducationLevel.ESP) {
      return SchoolEducationType.Especial;
    } else if (nivel.nivel === SchoolEducationLevel.ESO) {
      return SchoolEducationType.ESO;
    } else if (nivel.nivel === SchoolEducationLevel.BACH) {
      return SchoolEducationType.Bachillerato;
    } else if (
      nivel.nivel === SchoolEducationLevel.CICLOS ||
      nivel.nivel === SchoolEducationLevel.FP
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

export function buildAddress(school: School) {
  return `${school.direccion.trim()}, ${school.cp} ${school.localidad}`;
}

export function prepareSchools(
  baseSchools: any[],
  infoSchools: any[],
  craSchools: number[]
): School[] {
  return baseSchools.map((baseSchool) => {
    const infoSchool = infoSchools.find((info) => {
      let codigo = info.código.toString();
      if (codigo.startsWith("03")) {
        codigo = codigo.substring(1);
      }
      return codigo === baseSchool.Codigo.toString();
    });
    const craSchool = craSchools.includes(baseSchool.Codigo);
    const caeSchool = infoSchool?.informacion_adicional
      ? infoSchool.informacion_adicional.find((info: string) =>
          info.includes("Centro Singular")
        )
      : false;
    const jornadaContinua = hasJornadaContinua(infoSchool);
    return {
      codigo: baseSchool.Codigo,
      denGenEs: baseSchool.Denominacion_Generica_ES,
      denGenVal: baseSchool.Denominacion_Generica_VAL,
      denEspec: baseSchool.Denominacion_Especifica,
      denominacion: baseSchool.Denominacion,
      regimen: baseSchool.Regimen,
      direccion: infoSchool?.dirección || "",
      localidad: baseSchool.Localidad,
      comarca: baseSchool.comarca || "",
      provincia: baseSchool.Provincia,
      cp: baseSchool.Codigo_postal,
      telefono: baseSchool.Telefono,
      fax: baseSchool.Fax,
      long: baseSchool.long,
      lat: baseSchool.lat,
      cif: baseSchool.CIF,
      instalaciones: infoSchool?.instalaciones || [],
      horario: (
        infoSchool?.horario?.filter((h: string) => !h.includes("JORNADA")) || []
      ).join(" | "),
      informacion_adicional: infoSchool?.informacion_adicional || [],
      niveles_autorizados: infoSchool?.niveles_autorizados || [],
      dist: 0,
      time: 0,
      cra: craSchool,
      caes: caeSchool,
      jornada_continua: jornadaContinua,
      niveles: calculateNiveles(infoSchool),
    };
  });
}
