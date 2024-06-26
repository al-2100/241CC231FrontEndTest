import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehiculo} from "../model/vehiculo";
import {Ordenserviciotecnico} from "../model/ordenserviciotecnico";
import {Cliente} from "../model/cliente";
import {getConexionBackend} from "../utils/constants";
@Injectable({
  providedIn: 'root'
})
export class OstService {
  BASE_URL: string;
  BASE_URL_CLIENTE: string;
  BASE_URL_VEHICULO: string;
  constructor(private http:HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL_CLIENTE = `${this.BASE_URL}/cliente`;
    this.BASE_URL_VEHICULO = `${this.BASE_URL}/vehiculo`;
    this.BASE_URL = `${this.BASE_URL}/ost`;
  }

  getOSTs(): Observable<Ordenserviciotecnico[]> {
    return this.http.get<Ordenserviciotecnico[]>(`${this.BASE_URL}/listar`);
  }

  registrarOST(cliente: Cliente, vehiculo: Vehiculo, fallareportada: string): Observable<any>{
    const data = {
      cliente,
      vehiculo,
      fallareportada
    };
    console.log(data);
    return this.http.post(`${this.BASE_URL}/insert`,  data );
  }

  buscarCliente(dni: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.BASE_URL_CLIENTE}/searchDNI`, { dni });
  }
  verificarVehiculo(placa:string): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.BASE_URL_VEHICULO}/searchPlaca`, { placa });
  }
  registrarVehiculo(placa: string, modelo: string, marca: string) {
    const form = {
      placa,
      modelo,
      marca};
    return this.http.post(`${this.BASE_URL_VEHICULO}/insert`, form);
  }
}
