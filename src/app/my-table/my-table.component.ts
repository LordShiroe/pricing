import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections'

import { MyTableDataSource } from './my-table-datasource'
import { Material } from '../contracts/resources/material'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  dataSource: MyTableDataSource

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'unit_value', 'amount']
  selection = new SelectionModel<Material>(true, [])

  @Input() deletedEvent: Subject<any>

  @Input() set materials(value: MyTableDataSource) {
    this.dataSource = value
    this.dataSource.data.forEach(row => {
      if (row.selected) {
        this.selection.select(row)
      } else {
        this.selection.deselect(row)
      }
    })
  }

  ngOnInit() {
    this.dataSource.pager = this.paginator
    this.dataSource.sorter = this.sort
    this.deletedEvent.subscribe(deletedControlData => {
      const index = this.dataSource.data.findIndex(row => row.id === deletedControlData.id)
      console.log(index)
      this.selection.deselect(this.dataSource.data[index])
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle() {
    const selected = this.isAllSelected()
    if (selected) {
      this.selection.clear()
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row))
    }
    this.dataSource.checkedAll(!selected)
  }

  onChange(event, row) {
    this.selection.toggle(row)
    this.dataSource.checked(event.checked, row)
  }
}
