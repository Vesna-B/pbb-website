import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SoftwareService } from '../software.service';

@Component({
  selector: 'app-review-earth-potential-rise',
  templateUrl: './review-earth-potential-rise.component.html',
  styleUrls: ['./review-earth-potential-rise.component.css']
})
export class ReviewEarthPotentialRiseComponent implements OnInit {

  dataFromBackend: any;
  Linechart = [];
  nizPotencijalTacakaTla = [];
  nizPotencijalnaRazlikaDodira = [];
  nizNaponDodira = [];
  nizPotencijalnaRazlikaKoraka = [];
  nizNaponKoraka = [];
  nizNaponUzemljivaca = [];
  nizDozvoljeniNapon = [];

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.dataFromBackend = this.softwareService.graphData;

    let condition = 0;
    let n = this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x.length;

    for (let i = 0; i < n; i++) {
      let tackaPotencijalTacakaTla = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.V[i]
      }
      let tackaPotencijalnaRazlikaDodira = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.Ed[i]
      }
      let tackaNaponDodira = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.Ud[i]
      }
      let tackaPotencijalnaRazlikaKoraka = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.Ek[i]
      }
      let tackaNaponKoraka = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.Uk[i]
      }

      this.nizPotencijalTacakaTla[i] = tackaPotencijalTacakaTla;
      this.nizPotencijalnaRazlikaDodira[i] = tackaPotencijalnaRazlikaDodira;
      this.nizNaponDodira[i] = tackaNaponDodira;
      this.nizPotencijalnaRazlikaKoraka[i] = tackaPotencijalnaRazlikaKoraka;
      this.nizNaponKoraka[i] = tackaNaponKoraka;

      if (i == n - 1) {    
        condition = 1;
      }
    }


    this.nizNaponUzemljivaca[0] = {
      x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[0],
      y: this.dataFromBackend.uzemljivac.U.data[0][0]
    }
    this.nizNaponUzemljivaca[1] = {
      x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[n-1],
      y: this.dataFromBackend.uzemljivac.U.data[0][0]
    }
    this.nizDozvoljeniNapon[0] = {
      x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[0],
      y: 0.750
    }
    this.nizDozvoljeniNapon[1] = {
      x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[n-1],
      y: 0.750
    }
    

    if (condition == 1) {     
      let potencijalTacakaTla = {
        label: "Potencijal tacaka tla",
        data: this.nizPotencijalTacakaTla,
        fill: false,
        borderColor: 'red',   
        radius: 0
      }
      let potencijalnaRazlikaDodira = {
        label: "Potencijalna razlika dodira",
        data: this.nizPotencijalnaRazlikaDodira,
        fill: false,
        borderColor: 'limegreen',       
        radius: 0
      }
      let naponDodira = {
        label: "Napon dodira",
        data: this.nizNaponDodira,
        fill: false,
        borderColor: 'yellow',    
        radius: 0
      }
      let potencijalnaRazlikaKoraka = {
        label: "Potencijalna razlika koraka",
        data: this.nizPotencijalnaRazlikaKoraka,
        fill: false,
        borderColor: 'deepskyblue',     
        radius: 0
      }
      let naponKoraka = {
        label: "Napon koraka",
        data: this.nizNaponKoraka,
        fill: false,
        borderColor: 'black',   
        radius: 0
      }
      let naponUzemljivaca = {
        label: "Napon uzemljivaca",
        data: this.nizNaponUzemljivaca,
        fill: false,
        borderColor: 'blue',    
        radius: 0
      }
      let dozvoljeniNapon = {
        label: "Dozvoljeni napon",
        data: this.nizDozvoljeniNapon,
        fill: false,
        borderColor: 'violet',    
        radius: 0
      }

      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          datasets: [
            potencijalTacakaTla,
            potencijalnaRazlikaDodira,
            naponDodira,
            potencijalnaRazlikaKoraka,
            naponKoraka,
            naponUzemljivaca,
            dozvoljeniNapon
          ]
        },
        options: {  
          legend: {  
            display: true  
          },  
          scales: {  
            xAxes: [{  
              type: 'linear',
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });
    } 
  }


}
