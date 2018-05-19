import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppFormTableDataSource } from './app-form-table-datasource';

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
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new AppFormTableDataSource(this.paginator, this.sort);
  }
}
