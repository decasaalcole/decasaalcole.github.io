export enum RawSchoolRegimenType {
    Public = 'PÚBLICO',
    Private = 'PRIVADO',
    PrivateConc = 'PRIVADO - CONCERTADO',
}

export enum SchoolRegimenType {
    Public = 'PUB',
    Private = 'PRIV',
    PrivateConc = 'CONC',
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





export interface RawTime {
    Codigo: number;
    Denominacion: string;
}

export interface ToZipCodeDistTime {
    zcTo: number;
    dist: number;
    time: number;
}


////////////////////////////

export enum SchoolEducationLevel {
    EI1 = 'EDUCACIÓN INFANTIL PRIMER CICLO',
    EI2 = 'EDUCACIÓN INFANTIL SEGUNDO CICLO',
    EP = 'EDUCACIÓN PRIMARIA',
    ESP = 'EDUCACIÓN ESPECIAL',
    ESO = 'EDUCACIÓN SECUNDARIA OBLIGATORIA',
    ESO1 = 'EDUCACIÓN SECUNDARIA OBLIGATORIA 1er CICLO',
    BACH = 'BACHILLERATO',
    CICLOS = 'CICLOS FORMATIVOS',
    FP = 'EDUCACIÓN DE FORMACIÓN PROFESIONAL',
    ADU = 'EDUCACIÓN DE ADULTOS',
    MODULOS = 'MÓDULOS PROFESIONALES',
    HOGAR = 'ESCUELAS HOGAR',
    PROF_INICIAL = 'PROGRAMAS DE CUALIFICACIÓN PROFESIONAL INICIAL',
}


export interface SchoolLevel {
    nivel: string;
    unidades_autorizadas?: number;
    puestos_autorizados?: number;
    unidades_activas?: number;
    puestos_activos?: number;
}

export interface rawSchool {
    codigo: string;        // codigo de la escuela
    denGenEs: string;      // nombre base de la escuela en castellano
    denGenVal: string;     // nombre base de la escuela en valenciano
    denEspec: string;      // nombre de la escuela
    deno: string;  // nombre completo de la escuela
    reg: string;        // regimen de la escuela (Públic, Privado, Concertado)
    dir: string;      // dirección de la escuela
    muni: string;      // localidad de la escuela
    com: string;         // comarca de la escuela
    prov: string;       // provincia de la escuela
    cp: string;             // código postal de la escuela
    tel: string;        // teléfono de la escuela
    fax: string;            // fax de la escuela
    email: string;          // email de la escuela
    cif: string;            // cif de la escuela
    long: string;           // longitud de la escuela
    lat: string;            // latitud de la escuela
    titular: string;         // titular de la escuela
    inst: string[]; // instalaciones de la escuela
    horario: string[];       // horario de la escuela
    info: string[]; // información adicional de la escuela
    niveles: SchoolLevel[]; // niveles autorizados de la escuela

}

export interface School extends rawSchool {
    dist: number;            
    time: number;            
    cra: boolean;            
    caes: boolean;          
    jornadaContinua: boolean;  
    reduNiveles: string[];
}

