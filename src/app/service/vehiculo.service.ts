import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehiculo} from "../model/vehiculo";
import {getConexionBackend} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {
  BASE_URL: string;
  constructor(private http:HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/vehiculo`;
  }
  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.BASE_URL}/listar`);
  }

  registrarVehiculo(form: any) {
    return this.http.post(`${this.BASE_URL}/insert`, form);
  }

  buscarVehiculo(form: any) {
    return this.http.post(`${this.BASE_URL}/search`, form);
  }

}
