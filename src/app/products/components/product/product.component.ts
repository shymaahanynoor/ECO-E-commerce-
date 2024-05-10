import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  template: `<app-product-details [data]="amount"></app-product-details>`
})
export class ProductComponent {
  @Input() data: any = {};
  @Output() selectedItem: any = new EventEmitter();
  addStatus: boolean = false;
  amount = 1;
  addItemToCart(event) {
    this.selectedItem.emit({
      item: this.data,
      quantity: this.amount,
    });

    this.addStatus = false;
  }
}
