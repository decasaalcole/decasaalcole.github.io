export enum SchoolRegimenType {
    Public = 'Pub',
    Private = 'Priv',
    PrivateConc = 'PrivConc',
}

export enum SchoolEducationType {
    Infantil = 'EI',
    Primaria = 'EP',
    Especial = 'ESP',
    ESO = 'SEC',
    Bachillerato = 'BACH',
    FP = 'FP',
    Adultos = 'ADU',
}

export enum SchoolCenterType {
    CRA = 'CRA',
    CAES = 'CAES',
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
    regimenTypes: SchoolRegimenType[];
    setRegimenTypes: any;
    educationTypes: SchoolEducationType[];
    setEducationTypes: any;
    dayTypes: SchoolDayType[];
    setDayTypes: any;
    provinces: Province[];
    setProvinces: any;
    centerTypes: SchoolCenterType[];
    setCenterTypes: any;
}

export interface BtnProps {
    text: string;
    value: SchoolRegimenType | SchoolEducationType | SchoolDayType | Province | SchoolCenterType    ;
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
    caes: boolean;
    jornada_continua: boolean;
}

export interface RawTime {
    Codigo: number;
    Denominacion: string;
}