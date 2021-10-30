import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { ListProductsComponent } from './list-products/list-products.component';


@NgModule({
    declarations: [
        CreateEditProductComponent,
        ListProductsComponent,
        ListCategoriesComponent,
        CreateEditCategoryComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule
    ]
})
export class CategoryModule { }
