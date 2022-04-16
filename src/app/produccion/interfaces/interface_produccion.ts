
export interface IProductosData{
    id: number;
    codigo: string;
    modelo: string;
    fecha_de_corte: Date | null;
    edad: string;
    rollos: number;
    tela: string;
    peso_promedio: number;
    total_por_talle: number;
    talles: number;
    total: number;
    fecha_de_pago: Date  | null;
    cantidad_entregada: number;
    fecha_de_salida: Date | null;
    fecha_de_entrada: Date | null;
    estado_pago: boolean;
    taller:{
        nombre_completo: string
    }
} 


export interface IAgregarDistribucion {
    local: string;
    talle: [{ talle: number, cantidad: number }];
}