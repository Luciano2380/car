import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Carro } from '../../modelos/carro';


@Injectable()
export class CarrosServiceProvider {

  constructor(public http: HttpClient) {
  
  }
  lista(){
   return this.http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos');
  }

}
