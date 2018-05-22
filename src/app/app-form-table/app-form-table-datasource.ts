import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';


/**
 * Data source for the AppFormTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AppFormTableDataSource extends DataSource<FormGroup> {
  data: FormArray;

  constructor(data: FormArray) {
    super();
    this.data = data
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FormGroup[]> {
    const obs = Observable.create(observer => {
      this.data.valueChanges.subscribe(val => {
        const arr: FormGroup[] = []
        const length = this.data.length
        for (let i = 0; i < length; i++) {
          arr.push(this.data.at(i) as FormGroup)
        }
        observer.next(arr)
      })
    })
    return obs
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }


}
