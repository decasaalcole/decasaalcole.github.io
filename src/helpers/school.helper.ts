import { School, SchoolDayType, SchoolRegimen, SchoolType, Province } from "../types/types";

function filterSchoolsByRegimen(schools: School[], regimen: SchoolRegimen[]) {
    return schools.filter((school: School) => {
        return regimen.includes(school.regimen as SchoolRegimen);
    });
}

function filterSchoolsByType(schools: School[], type: SchoolType[]) {
    console.log('filterSchoolsByType | types', type);
    return schools
}

function filterSchoolsByDayType(schools: School[], dayType: SchoolDayType[]) {
    console.log('filterSchoolsByDayType | types', dayType);
    return schools
}

function filterSchoolsByProvince(schools: School[], provinces: Province[]) {
    return schools.filter((school: School) => {
        return provinces.includes(school.provincia as Province);
    });
}

export function filterSchools(schools: School[], regimen: SchoolRegimen[], type: SchoolType[], dayType: SchoolDayType[], province: Province[]) {
   const filteredSchools = filterSchoolsByRegimen(schools, regimen);
   const filteredSchoolsByType = filterSchoolsByType(filteredSchools, type);
   const filteredSchoolsByDayType = filterSchoolsByDayType(filteredSchoolsByType, dayType);
   const filteredSchoolsByProvince = filterSchoolsByProvince(filteredSchoolsByDayType, province);
   return filteredSchoolsByProvince;
}

export function buildAddress(school: School) {
    return `${school.direccion.trim()}, ${school.cp} ${school.localidad}, ${school.provincia}`;
}

export function mergeSchools(baseSchools: any[], infoSchools: any[], craSchools: number[], caeSchools: number[]): School[] {
    return baseSchools.map(baseSchool => {
        const infoSchool = infoSchools.find(info => {
            let codigo = info.código.toString();
            if (codigo.startsWith('03')) {
                codigo = codigo.substring(1);
            }
            return codigo === baseSchool.Codigo.toString();
        });
        const craSchool = craSchools.includes(baseSchool.Codigo);
        const caeSchool = caeSchools.includes(baseSchool.Codigo);
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
            cae: caeSchool,
        };
    });
}