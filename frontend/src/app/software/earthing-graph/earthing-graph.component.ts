import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SoftwareService } from '../software.service';

@Component({
  selector: 'app-earthing-graph',
  templateUrl: './earthing-graph.component.html',
  styleUrls: ['./earthing-graph.component.css']
})
export class EarthingGraphComponent implements OnInit {

  form: FormGroup;

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.form = new FormGroup({
      IuzemljivacaEff: new FormControl(null, Validators.required),
      duzinaSegmenta: new FormControl(null, Validators.required),
      roZemlje: new FormControl(null, Validators.required),
      dl: new FormControl(null, Validators.required),
      granicaUdaljenostiOdUzemljivaca: new FormControl(null, Validators.required),
      korakMrezeNaZemlji: new FormControl(null, Validators.required),
      //Udoz: new FormControl(null, Validators.required),
      Rcoveka: new FormControl(null, Validators.required),
      Dstopala: new FormControl(null, Validators.required),
      rotuc: new FormControl(null, Validators.required),
      ltuc: new FormControl(null, Validators.required),
      imeFajla: new FormControl(null, Validators.required)
    })
  }

  get IuzemljivacaEff() { return this.form.get('IuzemljivacaEff') }
  get duzinaSegmenta() { return this.form.get('duzinaSegmenta') }
  get roZemlje() { return this.form.get('roZemlje') }
  get dl() { return this.form.get('dl') }
  get granicaUdaljenostiOdUzemljivaca() { return this.form.get('granicaUdaljenostiOdUzemljivaca') }
  get korakMrezeNaZemlji() { return this.form.get('korakMrezeNaZemlji') }
  //get Udoz() { return this.form.get('Udoz') }
  get Rcoveka() { return this.form.get('Rcoveka') }
  get Dstopala() { return this.form.get('Dstopala') }
  get rotuc() { return this.form.get('rotuc') }
  get ltuc() { return this.form.get('ltuc') }
  get imeFajla() { return this.form.get('imeFajla') }


  pickFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    
    this.form.patchValue({ imeFajla: file });
    this.form.get("imeFajla").updateValueAndValidity();
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    this.softwareService.drawEarthingGraph(this.form.value); 
  }

}
