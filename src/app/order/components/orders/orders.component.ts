import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private services: OrderService) {}
  total: any = 0;
  orderProducts: any[] = [];
  user: any;

  getOrderProduct() {
    this.services.getAllOrder().subscribe((data: any) => {
      this.orderProducts = data;
      console.log(this.orderProducts);
    });
    this.total = 0;
    this.getTotal();
  }

  /////////
  getTotal() {
    this.services.getAllOrder().subscribe((data: any) => {
      this.orderProducts = data;
      for (let i = 0; i < this.orderProducts.length; i++) {
        this.total +=
          parseInt(this.orderProducts[i].proPrice) *
          parseInt(this.orderProducts[i].quantity);
      }
    });
  }

  deleteCurrentItem(proId) {
    this.services.deleteCurrentFromOrder(proId).subscribe((data: any) => {
      console.log(data);
    });
    this.getOrderProduct();
  }

  status: boolean;
  ngOnInit(): void {
    this.getOrderProduct();

    console.log(this.total);
  }
}
