import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource:any = [];
  manageOrderForm:any = FormGroup;
  categories:any = [];
  products:any = [];
  price:any;
  totalAmount:number = 0;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private productService:ProductService,
    private snackbarService:SnackbarService,
    private billService:BillService,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategories();
    this.manageOrderForm = this.formBuilder.group({
      
      name: [null,[Validators.required, Validators.pattern(GlobalConstants.nameRgex)]],
      email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRgex)]],
      contactNumber:[null,[Validators.required, Validators.pattern(GlobalConstants.contactNumberRgex)]],
      paymentMethod:[null, [Validators.required]],
      product:[null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]]

    });
  }

  getCategories() {
    this.categoryService.getFilteredCategories().subscribe((response:any) => {
      this.ngxService.stop();
      this.categories = response;
    }, (error:any) => {
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
