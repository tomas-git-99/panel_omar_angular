export interface HistorialOrden {
    ok:    boolean;
    data: Orden;
    contador: number;
}

export interface Orden {
    id:                number;
    estado:            boolean;
    created_at:        Date;
    updated_at:        Date;
    orden_detalle:     OrdenDetalle[];
    nota:              Nota[];
    descuento:         Descuento[];
    sumaOrden:         SumaOrden[];
    ordenEstado:       OrdenEstado[];
    cliente:           Cliente;
    cliente_direccion: ClienteDireccion;
}

export interface Cliente {
    id:       number;
    nombre:   string;
    apellido: string;
    dni_cuil: string;
    telefono: string;
    email:    string;
}

export interface ClienteDireccion {
    id:        number;
    direccion: string;
    cp:        string;
    localidad: string;
    provincia: string;
}

export interface Descuento {
    id:     number;
    precio: number;
    motivo: string;
}
export interface SumaOrden {
    id:     number;
    precio: number;
    motivo: string;
}

export interface Nota {
    id:              number;
    nota:            string;
    producto_ventas: Producto ;
}

export interface Producto {
    id:         number;
    precio:     number;
    color:      string;
    sub_modelo: null;
    sub_dibujo: null;
    created_at: Date;
    updated_at: Date;
}



export interface OrdenEstado {
    id:             number;
    metodo_de_pago: string;
    factura:        string;
    pagado:         boolean;
    fecha_de_pago:  null;
    transporte:     string;
    fecha_de_envio: Date;
    armado:         Armado;
}

export interface Armado {
    id:        number;
    nombre:    string;
    direccion: string;
    telefono:  null;
    estado:    boolean;
}

export interface OrdenDetalle {
    id:       number;
    cantidad: number;
    talle:    number;
    precio:   number;
    productoVentas: Producto;
}
