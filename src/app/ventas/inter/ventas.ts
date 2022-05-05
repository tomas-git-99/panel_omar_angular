export interface Localidades {
    localidades: Localidade[];
    total:       number;
    cantidad:    number;
    parametros:  Parametros;
    inicio:      number;
  }
  
  export interface Localidade {
    categoria:        Categoria;
    fuente:           Fuente;
    municipio:        Departamento;
    departamento:     Departamento;
    nombre:           string;
    id:               string;
    provincia:        Departamento;
    localidad_censal: Departamento;
    centroide:        Centroide;
  }
  
  export enum Categoria {
    ComponenteDeLocalidadCompuesta = "Componente de localidad compuesta",
    ComponenteDeLocalidadCompuestaConEntidad = "Componente de localidad compuesta con entidad",
    Entidad = "Entidad",
    LocalidadSimple = "Localidad simple",
    LocalidadSimpleConEntidad = "Localidad simple con entidad",
  }
  
  export interface Centroide {
    lat: number;
    lon: number;
  }
  
  export interface Departamento {
    nombre: null | string;
    id:     null | string;
  }
  
  export enum Fuente {
    Indec = "INDEC",
  }
  
  export interface Parametros {
  }



  ///formDe pago

  export interface FormaDePago {
    armado: string;
    fecha_de_envio: Date;
    metodo_de_pago: string;
    pagado:boolean;
    tipo_de_pago: string;
    transporte: string;
  }




  ///venta

  export interface ProductosVentas {
    ok:       boolean;
    data:     Datum[];
    contador: number;
}

export interface Datum {
    id:               number;
    precio:           number;
    color:            string;
    sub_modelo:       null;
    sub_dibujo:       null;
    productoDetalles: ProductoDetalles;
    talles_ventas:    TallesVenta[];
}

export interface ProductoDetalles {
    id:       number;
    local:    string;
    producto: Producto;
}

export interface Producto {
    id:        number;
    codigo:    string;
    modelo:    string;
    edad:      string;
    tela:      string;
    estampado: Estampado;
}

export interface Estampado {
    id:     number;
    dibujo: string;
}

export interface TallesVenta {
    id:       number;
    talles:   number;
    cantidad: number;
}


