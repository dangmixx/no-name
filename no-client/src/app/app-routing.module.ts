import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
        redirectTo : 'shop'
	},
    {
		path: 'shop',
		pathMatch: 'full',
		loadChildren: () => import('./layout/shop/shop.module').then((m) => m.ShopModule),
	},
	{
		path: 'admin',
		loadChildren: () => import('./layout/admin/admin.module').then((m) => m.AdminModule),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled',
			onSameUrlNavigation: 'reload',
			scrollPositionRestoration: 'top',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
