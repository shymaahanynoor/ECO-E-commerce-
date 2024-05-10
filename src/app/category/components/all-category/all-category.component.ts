import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrl: './all-category.component.css'
})
export class AllCategoryComponent {
  errorMsg: any;
  allCategory: any[] = [];
    //--------------------------------------------------------------------------
  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.getCategory();
  }
  //--------------------------------------------------------------------------

getCategory() {
    this.service.getAllCategory().subscribe({
      next: (result: any) => {
        this.allCategory= result;
        console.log(result);
      },
      error: (err) => (this.errorMsg = err),
    });

}
} 
