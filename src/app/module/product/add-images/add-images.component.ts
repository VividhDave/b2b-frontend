import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilityService } from '../../../service/utility/utility.service';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  public id: any;
  imageList: any[] = [];
  urls = new Array<string>();
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly utilityService: UtilityService,
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (!this.id) {
      this.location.back();
    }
  }

  ngOnInit(): void {
  }

  handle(files: any) {
    this.imageList = files;
    if (files.length > 0) {
      if (files[0].size > 1000000) {
        this.utilityService.showInfo("Size is more than 1 MB")
        setTimeout(()=>{
        window.location.reload();
        }, 3000)
      } else {
        files.forEach(element => {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          }
          reader.readAsDataURL(element);
        });
      }
    }

  }

  save(): void {
    console.log(this.imageList);
    const formData = new FormData();
    for (let index = 0; index < this.imageList.length; index++) {
      formData.append("files", this.imageList[index]);
    }
    formData.append("productId", this.id);
    this.customHttpService.postMultiPartMultipleFile('product_image/save', formData)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['product/product-view'], { queryParams: { id: this.id } });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(): void {
    this.router.navigate(['product/product-view'], { queryParams: { id: this.id } });
  }
}
