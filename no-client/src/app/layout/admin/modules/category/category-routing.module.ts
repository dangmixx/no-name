import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'categories'
    },
    {
        path: 'categories',
        children: [
            {
                path: '',
                component: ListCategoriesComponent
            },
            {
                path: 'new',
                component: CreateEditCategoryComponent
            },
            {
                path: 'edit/:id',
                component: CreateEditCategoryComponent
            },]
    },
    {
        path: 'product',
        children: [
            {
                path: '',
                component: ListProductsComponent
            },
            {
                path: 'new',
                component: CreateEditProductComponent
            },
            {
                path: 'edit/:id',
                component: CreateEditProductComponent
            },]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
