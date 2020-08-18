import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  graphData: any;

  constructor(private http: HttpClient, private router: Router) { }

  drawEarthingGraph(data) {
    const dataToSend = new FormData();

    dataToSend.append("IuzemljivacaEff", data.IuzemljivacaEff);
    dataToSend.append("duzinaSegmenta", data.duzinaSegmenta);
    dataToSend.append("roZemlje", data.roZemlje);
    dataToSend.append("dl", data.dl);
    dataToSend.append("granicaUdaljenostiOdUzemljivaca", data.granicaUdaljenostiOdUzemljivaca);
    dataToSend.append("korakMrezeNaZemlji", data.korakMrezeNaZemlji);
    //dataToSend.append("Udoz", data.Udoz);
    dataToSend.append("Rcoveka", data.Rcoveka);
    dataToSend.append("Dstopala", data.Dstopala);
    dataToSend.append("rotuc", data.rotuc);
    dataToSend.append("ltuc", data.ltuc);
    dataToSend.append("imeFajla", data.imeFajla);
    
    this.http.post<{ uzemljivac: any, XYZtackeNaPovrsini: any, pravacI: any }>('http://localhost:3000/software', dataToSend)
      .subscribe(response => {
        this.graphData = {
          uzemljivac: response.uzemljivac,
          XYZtackeNaPovrsini: response.XYZtackeNaPovrsini,
          pravacI: response.pravacI
        }
        console.log(this.graphData);
        this.router.navigate(['review-earth-potential-rise'])
        //window.open('http://localhost:4200/review-earth-potential-rise');
      })
  }




}
