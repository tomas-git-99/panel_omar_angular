

export interface ProductosVentasTodos {
    ok:       boolean;
    data:     InfoProductos[];
    contador: number;
}

export interface InfoProductos {
    id:           number;
    codigo:       string;
    modelo:       string;
    edad:         string;
    tela:         string;
    distribucion: Distribucion[];
    estampado:    Estampados;
}

export interface Estampados {
    id:     number;
    dibujo: string;
}

export interface Distribucion {
    id:             number;
    local:          Local;
    productoVentas: ProductoVenta;
}

export interface Local {
    id:     number;
    nombre: string;
}

export interface ProductoVenta {
    id:            number;
    precio:        number;
    color:         string;
    sub_modelo:    null | string;
    sub_dibujo:    null | string;
    talles_ventas: TallesVenta[];
}

export interface TallesVenta {
    id:       number;
    talles:   number;
    cantidad: number;
}