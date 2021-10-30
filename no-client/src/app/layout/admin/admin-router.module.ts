import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-main/admin-main.component';

const routes: Routes = [
	{
		path: '',
		component: AdminMainComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'dashboard',
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
			{
				path: 'category',
				loadChildren: () => import('./modules/category/category.module').then((m) => m.CategoryModule),
			},
		]
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
export class AdminRoutingModule {}
