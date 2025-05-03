import { School, SchoolDayType, SchoolRegimenType, SchoolEducationType, SchoolCenterType, Province } from "../types/types";

function filterSchoolsByProvince(schools: School[], provinces: Province[]): School[] {
    if (provinces.length === Object.keys(Province).length) {
        return schools;
    }
    return schools.filter((school: School) => {
        return provinces.includes(school.provincia as Province);
    });
}

function filterSchoolsByRegimen(schools: School[], regimenTypes: SchoolRegimenType[]): School[] {
    if (regimenTypes.length === Object.keys(SchoolRegimenType).length) {
        return schools;
    }
    return schools.filter((school: School) => {
        return regimenTypes.includes(school.regimen as SchoolRegimenType);
    });
}

function filterSchoolsByEducation(schools: School[], educationTypes: SchoolEducationType[]): School[] {
    console.log('filteredSchoolsByEducationType | types', educationTypes);
    return schools
}

function filterSchoolsByCenterType(schools: School[], centerTypes: SchoolCenterType[]): School[] {
    if (centerTypes.length === 0) {
        return schools;
    }
    return schools.filter((school: School) => {
        return centerTypes.some(centerType => {
            if (centerType === SchoolCenterType.CRA) {
                return school.cra;
            }
            if (centerType === SchoolCenterType.CAES) {
                return school.caes;
            }
            return false;
        });
    });
}

function filterSchoolsByDayType(schools: School[], dayType: SchoolDayType[]): School[] {
    console.log('filterSchoolsByDayType | types', dayType);
    return schools
}



export function filterSchools(schools: School[], regimenTypes: SchoolRegimenType[], educationTypes: SchoolEducationType[], dayTypes: SchoolDayType[], province: Province[], centerTypes: SchoolCenterType[]): School[] {
    const filteredSchoolsByProvince = filterSchoolsByProvince(schools, province);
    const filteredSchoolsByRegimen = filterSchoolsByRegimen(filteredSchoolsByProvince, regimenTypes);
    const filteredSchoolsByEducationType = filterSchoolsByEducation(filteredSchoolsByRegimen, educationTypes);
   const filteredSchoolsByDayType = filterSchoolsByDayType(filteredSchoolsByEducationType, dayTypes);
   const filteredSchoolsByCenterType = filterSchoolsByCenterType(filteredSchoolsByDayType, centerTypes);
   return filteredSchoolsByCenterType;
}

export function buildAddress(school: School) {
    return `${school.direccion.trim()}, ${school.cp} ${school.localidad}, ${school.provincia}`;
}

export function prepareSchools(baseSchools: any[], infoSchools: any[], craSchools: number[]): School[] {
    return baseSchools.map(baseSchool => {
        const infoSchool = infoSchools.find(info => {
            let codigo = info.código.toString();
            if (codigo.startsWith('03')) {
                codigo = codigo.substring(1);
            }
            return codigo === baseSchool.Codigo.toString();
        });
        const craSchool = craSchools.includes(baseSchool.Codigo);
        const caeSchool = infoSchool?.informacion_adicional ? infoSchool.informacion_adicional.find((info: string) => info.includes('Centro Singular')) : false;
        return {
            codigo: baseSchool.Codigo,
            denGenEs: baseSchool.Denominacion_Generica_ES,
            denGenVal: baseSchool.Denominacion_Generica_VAL,
            denEspec: baseSchool.Denominacion_Especifica,
            denominacion: baseSchool.Denominacion,
            regimen: baseSchool.Regimen,
            direccion: infoSchool?.dirección || '',
            localidad: baseSchool.Localidad,
            comarca: baseSchool.comarca || '',
            provincia: baseSchool.Provincia,
            cp: baseSchool.Codigo_postal,
            telefono: baseSchool.Telefono,
            fax: baseSchool.Fax,
            long: baseSchool.long,
            lat: baseSchool.lat,
            cif: baseSchool.CIF,
            instalaciones: infoSchool?.instalaciones || [],
            horario: infoSchool?.horario || [],
            informacion_adicional: infoSchool?.informacion_adicional || [],
            niveles_autorizados: infoSchool?.niveles_autorizados || [],
            dist: 0,
            time: 0,
            cra: craSchool,
            caes: caeSchool,
        };
    });
}