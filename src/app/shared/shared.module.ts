import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, SelectComponent, AlertComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [HeaderComponent, SpinnerComponent, SelectComponent],
})
export class SharedModule {}
