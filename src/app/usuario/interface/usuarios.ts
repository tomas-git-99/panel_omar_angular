
export interface UsuariosNew {
    id: number;
    nombre: string;
    dni_cuil: string;
    roles: string ; 
    usuario: string;
    local:Local,
    permisos: Permisos
}


interface Permisos{
    id: number;
    permisosLocales:PermisosLocales[],
    permisosVentanas:PermisosVentanas[]
}
export interface PermisosLocales{
    id: number;
    local:Local;
}

export interface PermisosVentanas{
    id: number;
    id_ventana:number;
    nombre:string;
}


export interface Local {
    id:number; 
    nombre:string;
}