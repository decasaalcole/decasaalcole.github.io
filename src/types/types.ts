export enum SchoolRegimen {
    Public = 'Pub',
    Private = 'Priv',
    PrivateConc = 'PrivConc',
}

export enum SchoolType {
    Infantil = 'EI',
    Primaria = 'EP',
    Especial = 'ESP',
    CRA = 'CRA',
    ESO = 'SEC',
    Bachillerato = 'BACH',
    FP = 'FP',
    Adultos = 'ADU',
}

export enum SchoolDayType {
    Continue = 'cont',
    Splitted = 'par',
}

export enum Province {
    Castellon = 'Castelló',
    Valencia = 'València',
    Alicante = 'Alacant',
}

export interface FinderProps {
    zipCode: number;
    setZipCode: (zipCode: number) => void;
    regimens: SchoolRegimen[];
    setRegimens: any;
    types: SchoolType[];
    setTypes: any;
    dayTypes: SchoolDayType[];
    setDayTypes: any;
    provinces: Province[];
    setProvinces: any;
}

export interface BtnProps {
    text: string;
    value: SchoolRegimen | SchoolType | SchoolDayType | Province;
    selected: boolean;
    setSelected: any;
}

export interface CardBtnProps {
    text: string;
    action: () => void;
}

export interface SchoolLevel {
    nivel: string;
    unidades_autorizadas: number;
    puestos_autorizados: number;
    unidades_activas: number;
    puestos_activos: number;
}

export interface School {
    codigo: string;   
    denGenEs: string;
    denGenVal: string;
    denEspec: string;
    denominacion: string;
    regimen: string;
    direccion: string;
    localidad: string;
    comarca: string;
    provincia: string;
    cp: number;
    telefono: number;
    fax: string;
    cif: string;
    long: string;
    lat: string;
    instalaciones: string[];
    horario: string[];
    informacion_adicional: string[];
    niveles_autorizados: SchoolLevel[];
    dist: number;
    time: number;
    cra: boolean;
    cae: boolean;
}

export interface RawTime {
    Codigo: number;
    Denominacion: string;
}