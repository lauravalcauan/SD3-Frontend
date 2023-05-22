import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  generateReport(data:any) {
    return this.httpClient.post(this.url+
      "/bill/generatedReport",data,{
        headers:new HttpHeaders().set('Content-type', "application/json")
      })
  }

  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/orderbill/getPdf",data,{responseType:'blob'});
  }

  getBills(){
    return this.httpClient.get(this.url + "/orderbill/getBills");
  }
}
