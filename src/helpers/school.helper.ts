import { School, SchoolDayType, SchoolRegimen, SchoolType, Province } from "../types/types";


export function filterSchoolsByZipCode  (schools: School[], zipCode: number) {
    return schools.filter((school: School) => {
        return Number(school.Codigo_postal) === zipCode;
    });
}

export function filterSchoolsByRegimen(schools: School[], regimen: SchoolRegimen[]) {
    return schools.filter((school: School) => {
        return regimen.includes(school.Regimen as SchoolRegimen);
    });
}

export function filterSchoolsByType(schools: School[], type: SchoolType[]) {
    console.log('filterSchoolsByType | types', type);
    return schools
}

export function filterSchoolsByDayType(schools: School[], dayType: SchoolDayType[]) {
    console.log('filterSchoolsByDayType | types', dayType);
    return schools
}

export function filterSchoolsByProvince(schools: School[], provinces: Province[]) {
    console.log('filterSchoolsByDayType | provinces', provinces);
    return schools
}

export function buildAddress(school: School) {
    return `${school.Tipo_Via} ${school.Direccion} ${school.Num}, ${school.Codigo_postal} ${school.Localidad}, ${school.Provincia}`;
}