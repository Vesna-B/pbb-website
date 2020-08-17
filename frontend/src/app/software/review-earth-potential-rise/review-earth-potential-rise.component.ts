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

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.dataFromBackend = this.softwareService.graphData;

    let condition = 1;
    for (let i = 0; i < this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x.length; i++) {
      let point = {
        x: this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x[i],
        y: this.dataFromBackend.pravacI.V[i]
      }
      this.nizPotencijalTacakaTla[i] = point;
      if (i == this.dataFromBackend.XYZtackeNaPovrsini.pravacI.x.length - 1) {
        condition = 1;
      }
    }


    if (condition == 1) {     
      let potencijalTacakaTla = {
        label: "Potencijal tacaka tla",
        data: this.nizPotencijalTacakaTla,
        fill: false,
        borderColor: 'red',
        radius: 0
      }

      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          datasets: [
            potencijalTacakaTla
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
