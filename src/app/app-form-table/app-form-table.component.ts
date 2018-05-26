import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { AppFormTableDataSource } from './app-form-table-datasource'
import { FormControl, FormArray } from '@angular/forms'
import { map } from 'rxjs/operators'

/**
 * Nota. Tal vez crear metodo que reciba la row como formgroup y retorne un
 * observable que emita el valor total cuando alguno de los elementos cambie
 * y se use el async pipe para hacer el dispose. Así no se depende del form control
 * creado en el componente padre.
 */

@Component({
  selector: 'app-form-table',
  templateUrl: './app-form-table.component.html',
  styleUrls: ['./app-form-table.component.css']
})
export class AppFormTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  dataSource: AppFormTableDataSource
  totals = { amount: 0, price: 0 }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'amount', 'earning', 'iva', 'total']

  @Input() set formTree(value: FormArray) {
    this.dataSource = new AppFormTableDataSource(value)
  }

  @Output() deleted = new EventEmitter()

  ngOnInit() {
    this.dataSource.data.valueChanges.subscribe(value => {
      const totalAmount = value.map(elem => elem.requestedAmount).reduce((a, b) => a + b, 0)
      const totalPrice = value.map(elem => elem.total_value).reduce((a, b) => a + b, 0)
      this.totals.amount = totalAmount
      this.totals.price = totalPrice
    })
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'El campo es requerido' :
      formControl.hasError('min') ? `El minimo valor es ${formControl.getError('min').min}` : ''
  }

  delete(row: FormControl) {
    this.deleted.emit(row.value)
  }

}
