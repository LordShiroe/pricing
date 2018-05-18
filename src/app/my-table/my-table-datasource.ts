import { DataSource } from '@angular/cdk/collections'
import { MatPaginator, MatSort } from '@angular/material'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'
import { Material } from '../contracts/resources/material'

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<Material> {
  data: Material[]
  private checkedRows = new Set<number>()

  /**
   * TODO: Observable o Subject con los checkeds
   */

  private paginator: MatPaginator
  private sort: MatSort
  constructor(private materials: Material[]) {
    super()
    this.data = materials
  }

  set pager(paginator: MatPaginator) {
    this.paginator = paginator
  }

  get pager() {
    return this.paginator
  }

  set sorter(sort: MatSort) {
    this.sort = sort
  }

  get sorter() {
    return this.sort
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Material[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ]

    // Set the paginators length
    this.paginator.length = this.data.length

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]))
    }))
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Material[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    return data.splice(startIndex, this.paginator.pageSize)
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Material[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc)
        case 'id': return compare(+a.id, +b.id, isAsc)
        default: return 0
      }
    })
  }

  checked(action: boolean, row: Material) {
    if (action) {
      this.checkedRows.add(row.id)
    } else {
      this.checkedRows.delete(row.id)
    }
  }

  checkedAll(action: boolean) {
    if (action) {
      this.data.forEach(row => this.checkedRows.add(row.id))
    } else {
      this.data.forEach(row => this.checkedRows.delete(row.id))
    }
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
