import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { Material } from '../contracts/resources/material'
import { MaterialsService } from '../services/http-services/materials.service'
import { MyTableDataSource } from '../my-table/my-table-datasource'
import { Subscription, Subject } from 'rxjs'
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit, OnDestroy {
  subscription = new Subscription()
  datasource: MyTableDataSource
  materialData: Material[] = []
  materials: FormArray
  formGroup: FormGroup
  formArray: FormArray
  isValid = false
  deleted = new Subject()

  private iva = 19
  private earning = 10

  constructor(private formBuiler: FormBuilder, private materialService: MaterialsService) { }

  ngOnInit() {
    this.formGroup = this.formBuiler.group({
      array: this.formBuiler.array([
        this.formBuiler.group({
          header: this.formBuiler.group({
            iva: [this.iva, Validators.required],
            earning: [this.earning, Validators.required]
          }),
          materials: this.formBuiler.array([], Validators.required)
        }),
        this.formBuiler.group({
          email: ['', Validators.email],
          subject: ['', Validators.maxLength(140)],
          text: ''
        })
      ])
    })
    this.formArray = this.formGroup.get('array') as FormArray
    this.materials = this.formArray.at(0).get('materials') as FormArray
    this.subscription.add(this.formArray.at(0).get('header').valueChanges
      .pipe(distinctUntilChanged(),
        debounceTime(500)
      ).subscribe(val => {
        const length = this.materials.length
        for (let i = 0; i < length; i++) {
          this.materials.at(i).patchValue({
            iva: val.iva,
            earning: val.earning
          })
        }
      }))
    this.materialService.get().subscribe(data => {
      this.materialData = data
      this.datasource = new MyTableDataSource(data)
      this.datasource.checkedSubject.subscribe(event => {
        if (event.checked) {
          this.addMaterial(event.row)
        } else {
          const index = this.searchMaterial(event.row)
          this.removeMaterial(index)
        }
        this.isValid = Boolean(this.materials.length)
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onDelete(row) {
    const index = this.searchMaterial(row)
    this.removeMaterial(index)
    this.deleted.next(row)
  }

  addMaterial(matRow: Material) {
    let total = matRow.unit_value + (matRow.unit_value * (this.earning / 100))
    total = total + (total * (this.iva / 100))
    const material = this.formBuiler.group({
      id: [matRow.id, Validators.required],
      name: matRow.name,
      amount: matRow.amount,
      requestedAmount: [1, Validators.compose([Validators.required, Validators.min(1)])],
      unit_value: [matRow.unit_value, Validators.required],
      total_value: [total, Validators.required],
      iva: [this.iva, Validators.compose([Validators.required, Validators.min(0)])],
      earning: [this.earning, Validators.compose([Validators.required, Validators.min(0)])]
    })
    this.subscription.add(material.valueChanges.subscribe(() => {
      material.get('total_value').setValue(this.getTotal(material), { emitEvent: false })
    }))
    this.materials.push(material)
    return this.materials.length - 1
  }

  removeMaterial(index: number) {
    try {
      this.materials.removeAt(index)
    } catch (err) {
      console.error(err)
      console.log('Tal vez el indice a remover es menor a cero')
    }
  }

  private getTotal(row: FormGroup) {
    const amount = row.get('requestedAmount').value
    const iva = row.get('iva').value
    const earning = row.get('earning').value
    const unitValue = row.get('unit_value').value
    let total = unitValue * amount
    total = total + (total * (earning / 100))
    total = total + (total * (iva / 100))
    return total
  }

  searchMaterial(material: Material) {
    const materials = this.materials.value as any[]
    return materials.findIndex(_material => material.id === _material.id)
  }

}
