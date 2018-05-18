import { Injectable } from '@angular/core'
import { Material } from '../../contracts/resources/material'
import { of } from 'rxjs'

const materials: Material[] = [
  {
    id: 1,
    name: 'Perno de 1/2',
    amount: 25,
    unit: 'UND',
    unit_value: 1200.23
  },
  {
    id: 2,
    name: 'Perno de 3/4',
    amount: 45,
    unit: 'UND',
    unit_value: 1250.35
  },
  {
    id: 3,
    name: 'Bisagra',
    amount: 5,
    unit: 'UND',
    unit_value: 3500
  }
]

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor() { }

  get = () => {
    return of(materials)
  }
}
