import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicio:ServicioService, private router:Router) { }

  ngOnInit(): void {
  }


  login(usuario:string, password:string){
    if(usuario == '' || password == ''){

      Swal.fire({
        icon: 'warning',
        title: 'No se puede dejar campos vacios',
      })
      return;
    }

    this.servicio.postLogin({usuario:usuario, password:password}).subscribe(
      res => {

       if(res.ok == true){
      
        localStorage.setItem('dataUsuario',  JSON.stringify(res.data))
  /*       localStorage.setItem('id_usuario', res.data.id);
        localStorage.setItem('usuario', res.data.usuario);
        localStorage.setItem('rol', res.data.roles);
 */
      

        res.data.roles == 'ventas'
        ? this.router.navigate(['/ventas'])
        : res.data.roles == 'produccion'
        ? this.router.navigate(['/produccion'])
        : this.router.navigate(['/produccion']);



      /*   Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
        }) */
        
       }else{
         Swal.fire({
            icon: 'warning',
            title: 'Oops... Usuario o contraseña incorrectos',
         })

       }
      
    }
    )
  }
}
