import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styles: [`
  mat-form-field{
    margin: 0 5px;
  }

  #form{
    display:flex;
  }
  `]
})
export class HeaderFormComponent implements OnInit {
  @Input() form: FormGroup

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'El campo es requerido' :
      formControl.hasError('min') ? `El minimo valor es ${formControl.getError('min').min}` : ''
  }
}
