import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasModule } from './ventas/ventas.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProduccionModule } from './produccion/produccion.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    UsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VentasModule,
    ProduccionModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    
    
    
  ],
  exports: [
    SidebarComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
