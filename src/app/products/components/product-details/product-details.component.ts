import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  template: `
  <p>{{ data }}</p>
`
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  @Input() data: number;
  constructor(
    private currentId: ActivatedRoute,
    private http: ProductsService
  ) {
    this.id = this.currentId.snapshot.paramMap.get('id');
  }
  loading: boolean = false;
  ngOnInit(): void {
    this.getProduct();
    console.log (this.data);
  }
  myData: any = {};
  getProduct() {
    this.loading = true;
    this.http.getProductsDetails(this.id).subscribe(
      (data) => {
        this.myData = data;
        this.loading = false;
      },
      (error) => {
        alert(error);
      }
    );
  }
}
