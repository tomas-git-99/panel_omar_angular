//carrito get 

export interface Carrito {
    ok:   boolean;
    data: Data;
  }
  
  export interface Data {
    id:      number;
    nombre:  string;
    usuario: string;
    roles:   string;
    carrito: CarritoElement[];
  }
  
  export interface CarritoElement {
    id:           number;
    cantidad:     number;
    talle:        number;
    precio_nuevo: null | number;
    producto:     CarritoProducto;
  }
  
  export interface CarritoProducto {
    id:               number;
    precio:           number;
    color:            string;
    sub_modelo:       null | string;
    sub_dibujo:       null | string;
    sub_local:       null | string;
    productoDetalles: ProductoDetalles;
  }
  
  export interface ProductoDetalles {
    id:       number;
    local:    string;
    producto: ProductoDetallesProducto;
  }
  
  export interface ProductoDetallesProducto {
    id:        number;
    codigo:        string;
    modelo:    string;
    edad:      string;
    tela:      string;
    estampado: Estampado;
  }
  
  export interface Estampado {
    id:     number;
    dibujo: string;
  }




  