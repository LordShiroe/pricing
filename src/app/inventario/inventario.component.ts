import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  formgroup: FormGroup

  private name = null
  private amount = 1
  private price = 1000

  myControl: FormControl = new FormControl()

  options = [
    'One',
    'Two',
    'Three'
  ]

  filteredOptions: Observable<string[]>

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.formgroup = this.formbuilder.group({
      name: [this.name, Validators.required],
      amount: [this.amount, Validators.compose([Validators.required, Validators.min(0)])],
      price: [this.price, Validators.compose([Validators.required, Validators.min(0)])]

    })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      )
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()))
  }

}
