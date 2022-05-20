


export interface Usuario {
    id: number,
    nombre: string,
    usuario: string,
    roles: string,
    local: Local | null
}


export interface Local {
    id: number,
    nombre: string,
}