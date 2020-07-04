import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private http: HttpClient) { }

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
    
    this.http.post<{ message: string }>('http://localhost:3000/software', dataToSend)
      .subscribe(response => {
        console.log(response.message);
      })
  }




}
