import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario,UsuarioConID,UsuarioParcial } from "./../modelos/usuario"
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL_API = 'http://localhost:3000/usuarios'
  public paginaActual = 1;

  constructor(
    private cliente: HttpClient
  ) { }

  public agregarNuevo(usuario: Usuario): Observable<any> {
    return this.cliente.post(this.URL_API, usuario, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }


  public buscarPorID(id: number): Observable<UsuarioConID | null> {
    return this.cliente.get<UsuarioConID | null>(`${this.URL_API}/${id}`);
  }

}
