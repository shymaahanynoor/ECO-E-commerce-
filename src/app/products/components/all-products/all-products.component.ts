import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  allProducts: any[] = [];
  allCategory: any[] = [];
  byName: string = '';
  selectedItem: string = 'all';
  loading: boolean = false;
  // ----------------------------
  constructor(private services: ProductsService) {}
  filterData(event) {
    let value = event.target.value;
    this.selectedItem = value;
    this.getProduct();
    console.log(this.selectedItem);
  }
  // --
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() allData = new EventEmitter();

  sendData(event) {
    this.allData.emit(event);
  }
  // --
  // --------------------------------------------------
  getProduct(): any {
    this.loading = true;
    this.allProducts = [];
    if (this.selectedItem == 'all') {
      this.services.getAllProductServices().subscribe(
        (data: any) => {
          this.loading = false;
          if (this.byName.length > 0) {
            data.forEach((element) => {
              if (
                element.proName
                  .toLowerCase()
                  .startsWith(this.byName.toLowerCase())
              ) {
                this.allProducts.push(element);
              }
            });
          } else {
            this.allProducts = data;
          }
          // console.log(data);
          // console.log(this.allProducts);
        },
        (erroe) => {
          this.loading = false;
          alert('API Error');
        }
      );
    } else {
      this.services.getProductsByCategory(this.selectedItem).subscribe(
        (data: any) => {
          this.loading = false;
          if (this.byName.length > 0) {
            data.forEach((element) => {
              if (
                element.proName
                  .toLowerCase()
                  .startsWith(this.byName.toLowerCase())
              ) {
                this.allProducts.push(element);
              }
            });
          } else {
            this.allProducts = data;
          }

          console.log(this.allProducts);
        },
        (error) => {
          this.loading = false;
          alert('API Error');
        }
      );
    }
  }
  // -------------------------------
  getCategory() {
    this.services.getAllProCategory().subscribe((data: any) => {
      this.allCategory = data;
      console.log(data);
    });
  }

  // ----------------------------
  myDataInLocalStorage: any[];

  addToCart(event) {
    this.services.addProducToCart(event).subscribe((data: any) => {});
  }
  // -----------------------------
  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
  }
  //
}
