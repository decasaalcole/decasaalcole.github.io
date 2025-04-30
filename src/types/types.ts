export enum SchoolRegimen {
    Public = 'Pub',
    Private = 'Priv',
    PrivateConc = 'PrivConc',
    All = 'all',
}

export enum SchoolType {
    Infantil = 'inf',
    Primaria = 'pri',
    Especial = 'esp',
    CRA = 'cra',
    ESO = 'eso',
    Bachillerato = 'bac',
    FP = 'fp',
    Adultos = 'adu',
    All = 'all',
}

export enum SchoolDayType {
    Continue = 'cont',
    Splitted = 'par',
}

export enum Province {
    Castellon = 'cas',
    Valencia = 'val',
    Alicante = 'ala',
}

export interface FinderProps {
    zipCode: number;
    setZipCode: (zipCode: number) => void;
    regimens: SchoolRegimen[];
    setRegimen: any;
    types: SchoolType[];
    setType: any;
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

export interface School {
    Codigo: number;
    Denominacion_Generica_ES: string;
    Denominacion_Generica_VAL: string;
    Denominacion_Especifica: string;
    Denominacion: string;
    Regimen: string;
    Tipo_Via: string;
    Direccion: string;
    Num: string;
    Codigo_postal: number;
    Localidad: string;
    Provincia: string;
    Telefono: number;
    Fax: string;
    COD_EDIFICACION: number;
    long: string;
    lat: string;
    Titularidad: string;
    CIF: string;
    Comarca: string;
}

export interface RawTime {
    Codigo: number;
    Denominacion: string;
}