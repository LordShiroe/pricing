import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

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

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.formgroup = this.formbuilder.group({
      name: [this.name, Validators.required],
      amount: [this.amount, Validators.compose([Validators.required, Validators.min(0)])],
      price: [this.price, Validators.compose([Validators.required, Validators.min(0)])]

    })
  }

}
