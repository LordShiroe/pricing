import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'

import { MyTableDataSource } from './my-table-datasource'
import { Material } from '../contracts/resources/material'

@Component({
  selector: 'app-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  private _materials: Material[]

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @Input() set materials(value: Material[]) {
    this._materials = value
  }

  dataSource: MyTableDataSource

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'unit_value', 'amount']
  selection = new SelectionModel<Material>(true, [])

  ngOnInit() {
    this.dataSource = new MyTableDataSource(this.paginator, this.sort, this._materials)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row))
  }

  onChange(event, row) {
    console.log(event)
    return event ? this.selection.toggle(row) : null
  }
}
