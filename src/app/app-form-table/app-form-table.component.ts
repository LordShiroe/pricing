import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppFormTableDataSource } from './app-form-table-datasource';
import { FormControl, FormArray } from '@angular/forms';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AppFormTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'amount', 'earning', 'iva', 'total'];

  @Input() set formTree(value: FormArray) {
    this.dataSource = new AppFormTableDataSource(value)
  }

  @Output() deleted = new EventEmitter()

  ngOnInit() {
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'El campo es requerido' :
      formControl.hasError('min') ? `El minimo valor es ${formControl.getError('min').min}` : ''
  }

  delete(row: FormControl) {
    this.deleted.emit(row.value)
    console.log("emit")
  }

}
