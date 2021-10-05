import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';

const routes: Routes = [
	{
		path: '',
		component: ShopMainComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'cart',
				component: LoginComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShopRoutingModule {}
