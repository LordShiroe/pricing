import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  formGroup: FormGroup
  formArray: FormArray
  isValid = false
  constructor(private formBuiler: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuiler.group({
      array: this.formBuiler.array([
        this.formBuiler.group({
          header: this.formBuiler.group({
            iva: [19, Validators.required],
            earning: [10, Validators.required]
          }),
          materials: this.formBuiler.array([])
        }),
        this.formBuiler.group({
          email: ['', Validators.email],
          subject: ['', Validators.maxLength(140)],
          text: ''
        })
      ])
    })
    this.formArray = this.formGroup.get('array') as FormArray
  }

  addMaterial() {
    const materials = this.formArray.at(0).get('materials') as FormArray
  }

}
