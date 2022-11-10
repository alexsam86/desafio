import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from "../../../servicios/usuario.service";

import { CarritoService } from "../../../servicios/carrito.service";
import { Carrito } from "../../../modelos/carrito"
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formulario: FormGroup;

  public carrito: Carrito={
    "id":0,
    "productos":[],
    "usuario":{
      "usuario":'',
      "correo":'',
      "contrasena":'',
      "isAdmin":false,
    },
    };

  constructor(
    private fb: FormBuilder,
    private usuarioServicio: UsuarioService,
    private carritoServicio: CarritoService,
    private router: Router,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      usuario: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      correo: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.email
      ]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      isAdmin: [false],
    });
  }

  public campo(control: string) {
    return this.formulario.get(control);
  }
  public errores(control: string) {
    return this.campo(control).errors
  }
  public esTocado(control: string) {
    return this.campo(control).touched;
  }
  public estaSucio(control: string) {
    return this.campo(control).dirty;
  }
  public guardarUsuario() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.http.get<any>("http://localhost:3000/usuarios")
    .subscribe(res => {
      const usuario = res.find((a: any) => {
        return a.usuario === this.formulario.value.usuario
      });
      if (usuario) {
        alert('Nombre de usuario no disponible.');
        this.router.navigate(['registro']);
      } else {

        this.usuarioServicio.agregarNuevo({
          ...this.formulario.value,
        })
          .subscribe(dato => {
            if (dato) {
              this.carrito.usuario=dato;
              this.carritoServicio.crearCarrito(this.carrito).subscribe()
              alert("Usuario registrado correctamente.");
              this.formulario.reset();
              this.formulario.updateValueAndValidity();
              this.router.navigate(['']);
            }
          })
      }
    }, err => {
      alert("Nuestros servicios no se encuentran disponibles.")
    })

  }

  ngOnInit() {
  }

}

