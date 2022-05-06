import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../constant/column-data';

@Component({
  selector: 'app-product-attribute-view',
  templateUrl: './product-attribute-view.component.html',
  styleUrls: ['./product-attribute-view.component.scss']
})
export class ProductAttributeViewComponent implements OnInit {
  attributeForm: FormGroup;
  categoryList: any[];
  attributeTypeList: Array<any> = TableColumnData.ATTRIBUTE_TYPE;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService) {
    this.getCategoryList()
    this.setupForm();
  }

  ngOnInit(): void {
  }

  setupForm() {
    this.attributeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['',Validators.required],
      category: this.formBuilder.group({
        id: ['']
      }),
    });
  }

  getCategoryList(): void {
    this.customHttpService.get('category/get_all_record',)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.categoryList = response.data
        console.log(response);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  save(): void {
    if (this.attributeForm.invalid) {
      this.validateAllFormFields(this.attributeForm);
      return;
    }
    if(!this.attributeForm.value.category.id){
      this.attributeForm.value.category=null;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('attribute/save', this.attributeForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['master/product-attribute/product-attribute-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(){
    this.router.navigate(['master/product-attribute/product-attribute-list']);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get f() { return this.attributeForm.controls; }
  get f1() {
    const category: any = this.attributeForm.controls.category;
    return category.controls;
  }

}
