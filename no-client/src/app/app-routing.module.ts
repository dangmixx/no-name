import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'shop',
	},
	{
		path: 'shop',
		loadChildren: () => import('./layout/shop/shop.module').then((m) => m.ShopModule),
	},
	{
		path: 'admin',
		loadChildren: () => import('./layout/admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: '**',
		redirectTo: 'shop',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled',
			onSameUrlNavigation: 'reload',
			scrollPositionRestoration: 'top',
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
