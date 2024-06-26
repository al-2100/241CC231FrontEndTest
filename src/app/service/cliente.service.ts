import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";
import {getConexionBackend} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  BASE_URL: string;
  constructor(private http:HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/cliente`;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.BASE_URL}/listar`);
  }
  registrarCliente(form: any) {
    return this.http.post(`${this.BASE_URL}/insert`, form);
  }

  actualizarCliente(form: any) {
    return this.http.post(`${this.BASE_URL}/update`, form);
  }

  eliminarCliente(cliente: Cliente) {
    return this.http.delete(`${this.BASE_URL}/delete`, {body: cliente});
  }
}
