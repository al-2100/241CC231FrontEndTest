import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getConexionBackend} from "../utils/constants";
import {Bitacora} from "../model/bitacora";


@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  BASE_URL: string;
  constructor(private http:HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/problemas`;
  }
  getBitacoras(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(`${this.BASE_URL}/listar`);
  }
  registrarBitacora(bitacora: Bitacora) {
    return this.http.post<Bitacora>(`${this.BASE_URL}/insert`, bitacora);
  }

  editarBitacora(bitacora: Bitacora) {
    return this.http.post<Bitacora>(`${this.BASE_URL}/update`, bitacora);
  }
  eliminarBitacora(bitacora: Bitacora) {
    return this.http.delete(`${this.BASE_URL}/delete`, { body: bitacora});
  }
}
