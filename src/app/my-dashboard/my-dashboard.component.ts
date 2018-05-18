import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { Material } from '../contracts/resources/material'
import { MaterialsService } from '../services/http-services/materials.service'
import { MyTableDataSource } from '../my-table/my-table-datasource'

@Component({
  selector: 'app-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  datasource: MyTableDataSource
  materialData: Material[] = []
  materials: FormArray
  formGroup: FormGroup
  formArray: FormArray
  isValid = false

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
    this.materialService.get().subscribe(data => {
      this.materialData = data
      this.datasource = new MyTableDataSource(data)
    })
  }

  addMaterial(matRow: Material) {
    const material = this.formBuiler.group({
      id: [matRow.id, Validators.required],
      name: matRow.name,
      amount: matRow.amount,
      requestedAmount: [0, Validators.required],
      unit_value: [matRow.unit_value, Validators.required],
      iva: [this.iva, Validators.required],
      earning: [this.earning, Validators.required]
    })
    this.materials.push(material)
    return this.materials.length - 1
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index)
  }

}
