import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.login = this.fb.group({
      usuario:[''],
      contrasena: ['',
        Validators.required
      ],
    });
  }

  logearse(){
    this.http.get<any>("http://localhost:3000/usuarios")
    .subscribe(res=>{
      const usuario = res.find((a:any)=>{
        return a.usuario === this.login.value.usuario && a.contrasena === this.login.value.contrasena
      });
      if(usuario){
        this.login.reset()
        localStorage.setItem('usuario', usuario.id)
        this.router.navigate(["listar", ])
      }else{
        alert("Usuario y/o contraseña incorrectos.")
      }
    },err=>{
      alert("Nuestros servicios no se encuentran disponibles.")
    })
  }



  ngOnInit() {
    const usuario= localStorage.getItem('usuario')
      if(usuario){
      localStorage.removeItem('usuario');
      }
  }




  }
