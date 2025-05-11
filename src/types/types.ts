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

export enum SchoolEducationLevel {
    EI1 = 'EDUCACIÓN INFANTIL PRIMER CICLO',
    EI2 = 'EDUCACIÓN INFANTIL SEGUNDO CICLO',
    EP = 'EDUCACIÓN PRIMARIA',
    ESP = 'EDUCACIÓN ESPECIAL',
    ESO = 'EDUCACIÓN SECUNDARIA',
    BACH = 'BACHILLERATO',
    CICLOS = 'CICLOS FORMATIVOS',
    FP = 'EDUCACIÓN DE FORMACIÓN PROFESIONAL',
    ADU = 'EDUCACIÓN DE ADULTOS',
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
    codigo: string;        // codigo de la escuela
    denGenEs: string;      // nombre base de la escuela en castellano
    denGenVal: string;     // nombre base de la escuela en valenciano
    denEspec: string;      // nombre de la escuela
    denominacion: string;  // nombre completo de la escuela
    regimen: string;        // regimen de la escuela (Públic, Privado, Concertado)
    direccion: string;      // dirección de la escuela
    localidad: string;      // localidad de la escuela
    comarca: string;         // comarca de la escuela
    provincia: string;       // provincia de la escuela
    cp: number;             // código postal de la escuela
    telefono: number;        // teléfono de la escuela
    fax: string;            // fax de la escuela
    email: string;          // email de la escuela
    cif: string;            // cif de la escuela
    long: string;           // longitud de la escuela
    lat: string;            // latitud de la escuela
    instalaciones: string[]; // instalaciones de la escuela
    horario: string[];       // horario de la escuela
    informacion_adicional: string[]; // información adicional de la escuela
    niveles_autorizados: SchoolLevel[]; // niveles autorizados de la escuela
    dist: number;            
    time: number;            
    cra: boolean;            
    caes: boolean;          
    jornada_continua: boolean; 
    niveles: SchoolEducationType[]; 
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