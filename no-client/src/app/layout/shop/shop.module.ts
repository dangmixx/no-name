import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-router.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { ShopNgZorroAntModule } from './ng-ant.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [HomeComponent, LoginComponent, ShopMainComponent],
	imports: [
		CommonModule,
		ShopRoutingModule,
		RouterModule,
		ShopNgZorroAntModule,
		ScrollingModule,
		DragDropModule,
		HttpClientModule,
		HttpClientJsonpModule,
		ReactiveFormsModule,
	],
})
export class ShopModule {}
